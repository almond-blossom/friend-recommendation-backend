const CODES = ['A', 'B', 'C', '1', '2', '3'];

export class RandomCodeGenerator {
  generate(length: number = 2): string {
    let coded = '';
    for (let i = 0; i < length; i += 1) {
      const index = Math.floor(
        Math.random() * (CODES.length),
      );
      coded += CODES[index];
    }
    return coded;
  }
}
