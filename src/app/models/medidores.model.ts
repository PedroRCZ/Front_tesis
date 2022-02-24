
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
  ap3ph : number;
  apl1 : number;
  apl2 : number;
  apl3 : number;
  rp3ph: number;
  rpl1: number;
  rpl2: number;
  rpl3: number;
  freq: number;
  ae3ph: number;
  ael1: number;
  ael2: number;
  ael3: number;
  re3ph: number;
  rel1: number;
  rel2: number;
  rel3: number;
  piso : number;
  id : number;

  constructor(v3ph : number,vl1 : number,vl2 : number,vl3 : number,
    i3ph : number,il1 : number,il2 : number,il3 : number,pf3ph : number,
    pfl1 : number,pfl2 : number,pfl3 : number,ap3ph : number,apl1 : number,
    apl2 : number,apl3 : number,rp3ph: number,rpl1: number,rpl2: number,
    rpl3: number,freq: number,ae3ph: number,ael1: number,ael2: number,
    ael3: number,re3ph: number,rel1: number,rel2: number,rel3: number,piso : number,id : number){

        this.v3ph = v3ph
        this.vl1 = vl1
        this.vl2 = vl2
        this.vl3 = vl3
        this.i3ph = i3ph
        this.il1 = il1
        this.il2 = il2
        this.il3 = il3
        this.pf3ph = pf3ph
        this.pfl1 = pfl1
        this.pfl2 = pfl2
        this.pfl3 = pfl3
        this.ap3ph = ap3ph
        this.apl1 = apl1
        this.apl2 = apl2
        this.apl3 = apl3
        this.rp3ph= rp3ph
        this.rpl1= rpl1
        this.rpl2= rpl2
        this.rpl3= rpl3
        this.freq= freq
        this.ae3ph= ae3ph
        this.ael1= ael1
        this.ael2= ael2
        this.ael3= ael3
        this.re3ph= re3ph
        this.rel1= rel1
        this.rel2= rel2
        this.rel3= rel3
        this.piso = piso
        this.id = id
      }
}
