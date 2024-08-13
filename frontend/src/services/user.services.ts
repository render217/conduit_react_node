/* eslint-disable @typescript-eslint/no-empty-object-type */
import api from "./api";
export type loginPayload = {
    email: string;
    password: string;
};

export type registerPayload = loginPayload & {
    username: string;
};

export type updateUserPayload = {};

class UserService {
    async login(payload: loginPayload) {
        const body = { user: payload };
        return api.post("/users/login", body);
    }
    async register(payload: registerPayload) {
        const body = { user: payload };
        return api.post("/users", body);
    }
    async getCurrentUser() {
        return api.get("/user");
    }
    async updateUser(payload: updateUserPayload) {
        return api.put("/user", payload);
    }
    async getProfile(slug: string) {
        return api.get(`/profiles/${slug}`);
    }
    async followUser(username: string) {
        return api.post(`/profiles/${username}/follow`);
    }
    async unfollowUser(username: string) {
        return api.delete(`/profiles/${username}/unfollow`);
    }
}

export default new UserService();
