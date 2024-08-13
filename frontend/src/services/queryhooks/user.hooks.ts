import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "..";
import {
    loginPayload,
    registerPayload,
    updateUserPayload,
} from "../user.services";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: loginPayload) =>
            await userService.login(payload),
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: async (payload: registerPayload) =>
            await userService.register(payload),
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => await userService.getCurrentUser(),
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: updateUserPayload) =>
            userService.updateUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};

export const useGetProfile = (username: string) => {
    return useQuery({
        queryKey: ["profile", username],
        queryFn: async () => await userService.getProfile(username),
        enabled: !!username,
    });
};

export const useFollowUser = () => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (username: string) => {
            return await userService.followUser(username);
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["articles"] });
            // queryClient.invalidateQueries({ queryKey: ["user"] });
            // queryClient.invalidateQueries({ queryKey: ["profile", profileId] });
        },
    });
};

export const useUnFollowUser = () => {
    return useMutation({
        mutationFn: async (username: string) => {
            return await userService.unfollowUser(username);
        },
        onSuccess: () => {},
    });
};
