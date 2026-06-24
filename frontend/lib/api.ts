const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMensajes(chatId: string) {

    const response = await fetch(
        `${API_URL}/chats/${chatId}/mensajes`
    );

    return response.json();
}

export async function crearMensaje(
    chatId: string, contenido: string
) {

    const response = await fetch(`${API_URL}/chats/${chatId}/mensajes`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ contenido, }),
        }
    );

    return response.json();
}

export async function eliminarMensaje(
    mensajeId: number
) {

    const response = await fetch(`${API_URL}/mensajes/${mensajeId}`,
        {
            method: "DELETE",
        }
    );

    return response.json();
}