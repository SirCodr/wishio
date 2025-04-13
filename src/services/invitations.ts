import { HttpRequest } from "@/lib/http";
import { Invitation, InvitationStatus } from "@/types/invitation";

export async function getById(id: string): Promise<Invitation> {
    return await new HttpRequest().get(`invitations/${id}`).then(res => res.data)
}

export async function answer(id: string, answer: InvitationStatus): Promise<void> {
    return await new HttpRequest().post(`invitations/${id}/answer`, { answer }).then(res => res.data)
}

export async function send(id: string): Promise<void> {
    return await new HttpRequest().post(`invitations/${id}/send`).then(res => res.data)
}