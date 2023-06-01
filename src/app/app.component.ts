import { Component } from '@angular/core';
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputNumber: string = '';
  binaryValue = '';
  octalValue = '';
  decimalValue = '';
  hexValue = '';

  convert(inputValue: string) {
    const numberToConvert = Number(inputValue);
    this.binaryValue = this.convertToBinaryWithFraction(numberToConvert);
    this.octalValue = this.convertToOctalWithFraction(numberToConvert);
    this.decimalValue = inputValue;
    this.hexValue = this.covertToHexWithFraction(numberToConvert);
  }

  clear() {
    this.inputNumber = '';
    this.binaryValue = '';
    this.octalValue = '';
    this.decimalValue = '';
    this.hexValue = '';
  }


  convertToBinaryWithFraction(num: number): string {
    let wholeNum: number;
    let fracNum: number;
    let binary: string;
    let bitsAfterDecimal: number;

    wholeNum = Math.floor(num);
    fracNum = num - wholeNum;
    binary = wholeNum.toString(2);
    bitsAfterDecimal = 10;
    if (bitsAfterDecimal > 0 && fracNum > 0) {
      binary = binary + ".";

      for (let i = 1; i <= bitsAfterDecimal; i++) {
        fracNum *= 2;

        if (fracNum >= 1) {
          binary = binary + "1";
          fracNum -= 1;
        } else if (fracNum !== 0) {
          binary = binary + "0";
        }
      }
    }

    return binary;
  }

  convertToOctalWithFraction(num: number): string {
    const wholeNum: number = Math.floor(num);
    let fracNum: number = num - wholeNum;
    const wholeOctal: string = wholeNum.toString(8);
    let fracOctal: string = "";

    while (fracNum > 0 && fracOctal.length < 10) {
      fracNum *= 8;
      fracOctal += Math.floor(fracNum);
      fracNum -= Math.floor(fracNum);
    }

    let octal: string = "";

    if (!fracOctal) {
      octal = wholeOctal;
    } else {
      octal = wholeOctal + "." + fracOctal;
    }

    return octal;
  }

  covertToHexWithFraction(num: number): string {
    const wholeNum: number = Math.floor(num);
    let fracNum: number = num - wholeNum;
    const wholeHex: string = wholeNum.toString(16);
    let fracHex: string = "";

    while (fracNum > 0 && fracHex.length < 10) {
      fracNum *= 16;
      fracHex += Math.floor(fracNum).toString(16);
      fracNum -= Math.floor(fracNum);
    }

    let hexOutput: string;

    if (!fracHex) {
      hexOutput = wholeHex;
    } else {
      hexOutput = wholeHex + "." + fracHex;
    }

    return hexOutput.toUpperCase();
  }
  app = initializeApp(environment.firebaseConfig);
}
