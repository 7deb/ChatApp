import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
<<<<<<< HEAD
=======
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
>>>>>>> bf2c0531fbcf7b5b8e6e3686bf8181eb6389bf25
	},
});
 