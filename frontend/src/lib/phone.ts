import VMasker from "vanilla-masker";

export function onlyNumbers(value: string) {
    return value.replace(/\D/g, "");
}

export function maskPhone(value: string) {
    const digits = onlyNumbers(value).slice(0, 11);
    const pattern = digits.length > 10 ? "(99) 99999-9999" : "(99) 9999-9999";

    return VMasker.toPattern(digits, pattern);
}

export function formatPhone(value: string) {
    const digits = onlyNumbers(value);
    if (digits.length < 10) return value;

    return maskPhone(digits);
}
