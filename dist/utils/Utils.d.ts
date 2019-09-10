export declare class Utils {
    static assertIsString(input: any, notEmpty?: boolean): string | boolean;
    static checkNumberRepetition(value: string | number, length?: number): boolean;
    static isNumberOrString(value: any): boolean;
    static padWithZeroes(value: string | number, length?: number, toRight?: boolean): string | boolean;
    static sanitizeToDigits(value: string | number): string | boolean;
}
