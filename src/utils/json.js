export const json = (str) => {
	return (new Function('return '+str))()
}