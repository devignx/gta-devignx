import { create } from "zustand";

const useStore = create((set) => ({
    accessToken: "",
    refreshToken: "",
    identity: {},
    user: {},
    theme: "default",
    setTheme: (theme) => {
        set(() => ({ theme }));
    },
    setUser: (user) => {
        set(() => ({ user }));
    },
    setIdentity: (identity) => {
        set(() => ({ identity }));
    },
    updateToken: (token, refresh) => {
        set(() => ({
            accessToken: token,
            refreshToken: refresh,
        }));
    },
    clearToken: () => {
        set(() => ({
            accessToken: "",
            refreshToken: "",
        }));
    },
}));

export default useStore;
