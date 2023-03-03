export default function ConvertSize(byte) {
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024)) {
        return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Йоттабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024)) {
        return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Зеттабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024)) {
        return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Эксабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024)) {
        return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Петабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024)) {
        return `${(byte / 1024 / 1024 / 1024 / 1024).toFixed(2)} Терабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024)) {
        return `${(byte / 1024 / 1024 / 1024).toFixed(2)} Гигабайт`
    }
    if (Math.trunc(byte / 1024 / 1024)) {
        return `${(byte / 1024 / 1024).toFixed(2)} Мегабит`
    }
    if (Math.trunc(byte / 1024)) {
        return `${(byte / 1024).toFixed(2)} Килобайт`
    }
    return `${byte} байт`;
}