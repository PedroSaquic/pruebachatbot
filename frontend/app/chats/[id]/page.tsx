"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getMensajes,
    crearMensaje,
    eliminarMensaje,
} from "@/lib/api";

export default function ChatPage() {

    const params = useParams();
    const chatId = params.id as string;
    const queryClient = useQueryClient();
    const [contenido, setContenido] = useState("");

    const { data, isLoading, error, } = useQuery({
        queryKey: ["mensajes", chatId],
        queryFn: () => getMensajes(chatId),
    });

    const crearMutation = useMutation({
        mutationFn: (contenido: string) => crearMensaje(chatId, contenido),
        onSuccess: () => {
            setContenido("");
            queryClient.invalidateQueries({
                queryKey: ["mensajes", chatId],
            });
        },
    });

    const eliminarMutation = useMutation({
        mutationFn: eliminarMensaje, onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mensajes", chatId],
            });
        },
    });

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error al cargar mensajes</p>;
    }

    if (data.mensajes.length === 0) {
        return (
            <div className="p-5">
                <h1 className="text-xl font-bold">
                    Chat con {data.chat.nombre}
                </h1>
                <p>Aun no hay mensajes</p>

                <div className="mt-5 flex gap-2">
                    <input className="border p-2"
                        value={contenido}
                        onChange={(e) =>
                            setContenido(e.target.value)
                        }
                    />

                    <button className="border px-3"
                        onClick={() => {

                            if (!contenido.trim()) {
                                return;
                            }

                            crearMutation.mutate(contenido);
                        }}
                    >Enviar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 bg-neutral-100">
            <div className="mb-4 bg-gray-200 -mx-5 -mt-5">
                <h1 className="text-xl font-arial mb-5 ml-5">Chat con {data.chat.nombre}</h1>
            </div>
            <div className="flex flex-col gap-3">
                {data.mensajes.map((mensaje: any) => (
                    <div key={mensaje.id}
                        className={mensaje.direccion === "saliente"
                            ? "ml-auto bg-green-200 p-3 rounded shadow-sm hover:shadow-md transition"
                            : "mr-auto bg-amber-50 p-3 rounded shadow-sm hover:shadow-md transition"
                        }
                    >
                        <p>{mensaje.contenido}</p>
                        <p className="text-xs">
                            {new Date(
                                mensaje.created_at
                            ).toLocaleTimeString()}
                        </p>
                        <button className="text-red-500 text-xs cursor-pointer" onClick={() => {
                            const confirmar = window.confirm("¿Eliminar mensaje?");

                            if (!confirmar) { return; }

                            eliminarMutation.mutate(mensaje.id);
                        }}
                        >Eliminar</button>
                    </div>
                )
                )}
            </div>
            <div className="mt-5 flex gap-2">
                <input className="p-2 flex-1 rounded bg-white hover:shadow-lg transition shadow-sm placeholder"
                    placeholder="Escribe un mensaje..."
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                />

                <button className="border px-3 cursor-pointer hover:bg-green-700 rounded bg-green-600 text-white" onClick={() => {
                    if (!contenido.trim()) { return; }

                    crearMutation.mutate(contenido);
                }}
                >Enviar</button>
            </div>
        </div>
    );
}
