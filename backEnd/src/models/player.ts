// src/models/player.ts
export interface Player {
    id: string;
    name: string;
    position: 'GK' | 'DF' | 'MD' | 'FW';
    suspended: boolean;
    injured: boolean;
}