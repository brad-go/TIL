interface Printer {
  print(message: string): void;
}

class RealPrinter implements Printer {
  print(message: string): void {
    console.log(`Real Printer print ${message}`);
  }
}

class ProxyPrinter implements Printer {
  private printNumber: number = 1;

  constructor(private realPrinter: RealPrinter) {}

  print(message: string): void {
    console.log(`Print number: ${this.printNumber}`);
    this.printNumber++;
    this.realPrinter.print(message);
  }
}

function printMessage(printer: Printer, message: string) {
  printer.print(message);
}

const realPrinter = new RealPrinter();
printMessage(realPrinter, "Hello world!");

console.log("");

const proxyPrinter = new ProxyPrinter(realPrinter);
printMessage(proxyPrinter, "Hello world!");
