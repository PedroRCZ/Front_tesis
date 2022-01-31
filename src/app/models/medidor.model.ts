export class Medidor{
  time: Date;
  v3ph: number;
  i3ph: number;
  pf3ph: number;

  constructor(time: Date, v3ph: number, i3ph: number, pf3ph: number){
      this.time = time;
      this.v3ph = v3ph;
      this.i3ph = i3ph;
      this.pf3ph = pf3ph;
  }
}
