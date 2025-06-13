const flags = {
    beta_access: process.env.NEXT_PUBLIC_BETA_ACCESS === '1',
};
export function isEnabled(flag) {
    return !!flags[flag];
}
