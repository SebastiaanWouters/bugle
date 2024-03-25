import { sessions } from "../sessions"

export default defineEventHandler(() => {
	return sessions.map((session) => {
		return session.channel;
	});
})
