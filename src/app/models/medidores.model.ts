
export class Medidores{

  v3ph : number;
  vl1 : number;
  vl2 : number;
  vl3 : number;
  i3ph : number;
  il1 : number;
  il2 : number;
  il3 : number;
  pf3ph : number;
  pfl1 : number;
  pfl2 : number;
  pfl3 : number;
  ae3ph : number;
  re3ph : number;
  se3ph : number;
  piso : number;
  id : number;

  constructor(v3ph : number,vl1 : number, vl2 : number,vl3 : number,
    i3ph : number,il1 : number,il2 : number,il3 : number,
    pf3ph : number,pfl1 : number,pfl2 : number,
    pfl3 : number,ae3ph : number,re3ph : number,se3ph : number,piso : number,id : number){

      this.v3ph = v3ph;
      this.vl1 = vl1;
      this.vl2 = vl2;
      this.vl3 = vl3;
      this.i3ph = i3ph;
      this.il1 = il1;
      this.il2 = il2;
      this.il3 = il3;
      this.pf3ph = pf3ph;
      this.pfl1 = pfl1;
      this.pfl2 = pfl2;
      this.pfl3 = pfl3;
      this.ae3ph = ae3ph;
      this.re3ph = re3ph;
      this.se3ph = se3ph;
      this.piso = piso;
      this.id = id;
      }
}
