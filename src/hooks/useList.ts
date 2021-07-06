import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type RoomType = {
    id: string,
    authorId: string,
    title: string,
    endedAt?: boolean
}

type FirebaseRooms = Record<string, {
    authorId: string,
    title: string,
    endedAt?: boolean
}>

export function useList() {
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        const roomRef = database.ref(`rooms`);
        roomRef.once('value', room => {
            const firebaseRooms: FirebaseRooms = room.val() ?? {};
            const parsedRooms = Object.entries(firebaseRooms).map(([key, value]) => {
                return {
                    id: key,
                    authorId: value.authorId,
                    title: value.title,
                    endedAt: value.endedAt ? true : false
                }
            });
            setRooms(parsedRooms);
        });

        return () => {
            roomRef.off('value');
        }
    }, [rooms]);

    return { rooms };
}