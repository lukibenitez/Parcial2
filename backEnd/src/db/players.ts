import { Player } from "../models/player";

let players: Player[] = [
    { id: "1", name: "Lionel Messi", position: "FW", suspended: false, injured: false },
    { id: "2", name: "Diego Godin", position: "DF", suspended: false, injured: true },
];

export const getPlayers = (): Player[] => {
    return players;
};

export const addPlayer = (jugador: Player): void => {
    players.push(jugador);
};

export const updatePlayer = (playerId: string, updatedPlayerData: Partial<Player>): boolean => {
    const index = players.findIndex(player => player.id === playerId);

    if (index !== -1) {
        players[index] = { ...players[index], ...updatedPlayerData };
        return true;
    }

    return false;
};

export const removePlayer = (playerId: string): void => {
    players = players.filter((player) => player.id !== playerId);
};

// export const removeAllPlayers = (): number => {
//     const initialLength = players.length;
//     players = [];
//     return initialLength - players.length;
// };
