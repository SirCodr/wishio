import { HttpRequest } from "@/lib/http";
import { Invitation } from "@/types/invitation";

export async function getById(id: string): Promise<Invitation> {
    return await new HttpRequest().get(`invitations/${id}`).then(res => res.data)
}