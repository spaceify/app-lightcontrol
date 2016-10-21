export class ColorTransformations {

    static RGBtoHSV(r : number, g : number, b : number) : number[]{

        //console.log("red value: "+r);

        var hue: number, sat: number, bri: number;

        var R : number = r/255;
        var G : number = g/255;
        var B : number = b/255;

        //let rgbToRange =[R, G, B]

        let cMax = Math.max(R, G, B);
        let cMin = Math.min(R, G, B);
        let delta = cMax - cMin;

        bri = cMax;

        if(delta === 0){
            hue = sat = 0;
        }
        else{

            if(R ===cMax)
                hue = 60*(((G-B)/delta) %6);
            if(G ===cMax)
                hue = 60*((B-R)/delta + 2);
            if(B ===cMax)
                hue = 60*((R-G)/delta +4);

            sat = 0;

            if(cMax != 0)
                sat = delta/cMax;

           
        }


        return [hue/360, sat, bri];
    }

    static RGBtoHSVbroken(r : number, g : number, b : number) : number[]{

        //console.log("red value: "+r);

        var R : number = r/255;
        var G : number = g/255;
        var B : number = b/255;

        //let rgbToRange =[R, G, B]

        let cMax = Math.max(R, G, B);
        let cMin = Math.min(R, G, B);
        let delta = cMax - cMin;

        var hue : number;

        if(R ===cMax)
            hue = 60*(((G-B)/delta) %6);
        if(G ===cMax)
            hue = 60*((B-R)/delta + 2);
        if(B ===cMax)
            hue = 60*((R-G)/delta +4);

        var sat : number = 0;

        if(cMax != 0)
            sat = delta/cMax;

        var bri = cMax;


        return [hue/360, sat, bri];
    }

    static HSVtoRGB (h : number, s : number, v : number) {
        var r : number, g:number, b:number;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return [ r * 255, g * 255, b * 255 ];
    }

    static HSVtoHSL(h : number, s : number, v : number) {
    // both hsv and hsl values are in [0, 1]
        var l = (2 - s) * v / 2;

        if (l != 0) {
            if (l == 1) {
                s = 0
            } else if (l < 0.5) {
                s = s * v / (l * 2)
            } else {
                s = s * v / (2 - l * 2)
            }
        }

        return [h, s, l]
    }

}