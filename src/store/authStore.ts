import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface AuthState {
    token: string | null
    refreshToken: string | null
    user: string | null
    setAuth: (token: string, refreshToken: string, user: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            refreshToken: null,
            user: null,
            setAuth: (token, refreshToken, user) =>
                set({token, refreshToken, user}),
            logout: () => set({token: null, refreshToken: null, user: null}),
        }),
        {
            name: 'auth-storage',
        }
    )
)
