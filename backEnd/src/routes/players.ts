// src/routes/jugadores.ts
import express from "express";
import { Player } from "../models/player";
import { getPlayers, addPlayer,updatePlayer, removePlayer } from "../db/players";
import authMiddleware from "../middleware/auth";


const router = express.Router();

// router.use(authMiddleware);

router.get("/players", authMiddleware, (req, res) => {
    const jugadores = getPlayers();
    res.status(200).json({ jugadores });
});

router.get("/players/:id", authMiddleware, (req, res) => {
    const playerId = req.params.id; // Obtener el ID del jugador de los parámetros de la URL
    const players: Player[] = getPlayers(); // Obtener la lista de jugadores

    const foundPlayer = players.find((player) => player.id === playerId); // Buscar el jugador por ID

    if (foundPlayer) {
        res.status(200).json({ jugador: foundPlayer });
    } else {
        res.status(404).json({ message: "Player not found" });
    }
});

router.post("/players", authMiddleware, (req, res) => {
    const { id, name, position, suspended, injured }: Player = req.body;
    const nuevoJugador: Player = { id, name, position, suspended, injured };
    addPlayer(nuevoJugador);
    res.status(201).json({ message: "Player added correctly!" });
});

router.post("/players/bulk", authMiddleware, (req, res) => {
    const newPlayers: Player[] = req.body;

    if (!Array.isArray(newPlayers) || newPlayers.length === 0) {
        return res.status(400).json({ message: "Invalid or empty player array" });
    }

    newPlayers.forEach((player) => {
        addPlayer(player);
    });

    res.status(201).json({ message: `${newPlayers.length} players added correctly!` });
});

router.put("/players/:id", authMiddleware, (req, res) => {
    const playerId = req.params.id;
    const { id, name, position, suspended, injured }: Player = req.body;

    // Verifica si se está intentando modificar el ID o el nombre
    if (id !== undefined || name !== undefined) {
        return res.status(400).json({
            message: "The 'id' and 'name' fields cannot be modified."
        });
    }

    const allowedFields = ["position", "suspended", "injured"];
    const updatedPlayerData: Partial<Player> = { position, suspended, injured };

    // Verifica si los campos enviados en la solicitud están permitidos para actualización
    const isValidUpdate = Object.keys(updatedPlayerData).every((field) =>
        allowedFields.includes(field)
    );

    if (!isValidUpdate) {
        return res.status(400).json({ message: "Invalid fields for update" });
    }

    const wasUpdated = updatePlayer(playerId, updatedPlayerData as Player);

    if (wasUpdated) {
        res.status(200).json({ message: "Player updated successfully" });
    } else {
        res.status(404).json({ message: "Player not found" });
    }
});

router.delete("/players/:id", authMiddleware, (req, res) => {
    const playerId = req.params.id;
    const initialPlayersLength = getPlayers().length;

    removePlayer(playerId); // Eliminar jugador por ID

    const currentPlayersLength = getPlayers().length;

    if (initialPlayersLength !== currentPlayersLength) {
        res.status(200).json({ message: "Player deleted successfully" });
    } else {
        res.status(404).json({ message: "Player not found" });
    }
});

// router.delete("/players/all", authMiddleware, (req, res) => {
//     const deletedPlayersCount = removeAllPlayers();

//     if (deletedPlayersCount > 0) {
//         res.status(200).json({ message: "All players deleted successfully" });
//     } else {
//         res.status(404).json({ message: "No players found to delete" });
//     }
// });


router.post('/call', (req, res) => {
    const { calledPlayersId }: { calledPlayersId: string[] } = req.body;
    const players = getPlayers();

    const hasInvalidPlayers = players.some((player) => {
        if (calledPlayersId.includes(player.id) && (player.suspended || player.injured)) {
            return true; // Jugador está suspendido o lesionado
        }
        return false;
    });

    if (hasInvalidPlayers) {
        res.status(400).json({ message: 'Algunos jugadores no existen o son inválidos' });
    } else {
        res.status(200).json({ message: 'Todos los jugadores están OK' });
    }
});


export default router;

