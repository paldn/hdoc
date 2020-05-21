const myUtils = 
{
    encrypt(fKLgsG1, sYmdvQZY2) 
    {
        if (sYmdvQZY2 == null || sYmdvQZY2["\x6c\x65\x6e\x67\x74\x68"] <= 0) {
            window["\x61\x6c\x65\x72\x74"]("\u5bc6\u94a5\u4e0d\u80fd\u4e3a\u7a7a");
            return null;
        }
        var $lLV3 = "";
        for (var tJFiW4 = 0; tJFiW4 < sYmdvQZY2["\x6c\x65\x6e\x67\x74\x68"]; tJFiW4++) {
            $lLV3 += sYmdvQZY2["\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74"](tJFiW4)["\x74\x6f\x53\x74\x72\x69\x6e\x67"]();
        }
        var drDJ5 = window["\x4d\x61\x74\x68"]["\x66\x6c\x6f\x6f\x72"]($lLV3["\x6c\x65\x6e\x67\x74\x68"] / 5);
        var ZssJ6 = window["\x70\x61\x72\x73\x65\x49\x6e\x74"]($lLV3["\x63\x68\x61\x72\x41\x74"](drDJ5) + $lLV3["\x63\x68\x61\x72\x41\x74"](drDJ5 * 2) + $lLV3["\x63\x68\x61\x72\x41\x74"](drDJ5 * 3) + $lLV3["\x63\x68\x61\x72\x41\x74"](drDJ5 * 4) + $lLV3["\x63\x68\x61\x72\x41\x74"](drDJ5 * 5));
        var RyF7 = window["\x4d\x61\x74\x68"]["\x63\x65\x69\x6c"](sYmdvQZY2["\x6c\x65\x6e\x67\x74\x68"] / 2);
        var PPiZmF8 = window["\x4d\x61\x74\x68"]["\x70\x6f\x77"](2, 31) - 1;
        var sXHJlrE9 = window["\x4d\x61\x74\x68"]["\x72\x6f\x75\x6e\x64"](window["\x4d\x61\x74\x68"]["\x72\x61\x6e\x64\x6f\x6d"]() * 1000000000) % 100000000;
        $lLV3 += sXHJlrE9;
        while ($lLV3["\x6c\x65\x6e\x67\x74\x68"] > 10) {
            var psS10 = window["\x4d\x61\x74\x68"]["\x63\x65\x69\x6c"]($lLV3["\x6c\x65\x6e\x67\x74\x68"] / 10);
            var Xk_lKMm11 = 0;
            for (var pWPkU12 = 0; pWPkU12 < psS10; pWPkU12++) {
                if (pWPkU12 == psS10["\x6c\x65\x6e\x67\x74\x68"] - 1) {
                    Xk_lKMm11 = window["\x70\x61\x72\x73\x65\x49\x6e\x74"](Xk_lKMm11) + window["\x70\x61\x72\x73\x65\x49\x6e\x74"]($lLV3["\x73\x75\x62\x73\x74\x72\x69\x6e\x67"](10 * pWPkU12, $lLV3["\x6c\x65\x6e\x67\x74\x68"]))
                } else {
                    Xk_lKMm11 = window["\x70\x61\x72\x73\x65\x49\x6e\x74"](Xk_lKMm11) + window["\x70\x61\x72\x73\x65\x49\x6e\x74"]($lLV3["\x73\x75\x62\x73\x74\x72\x69\x6e\x67"](10 * pWPkU12, 10 * (pWPkU12 + 1)))
                }
            }
            $lLV3 = Xk_lKMm11["\x74\x6f\x53\x74\x72\x69\x6e\x67"]();
        }
        $lLV3 = (ZssJ6 * window["\x70\x61\x72\x73\x65\x49\x6e\x74"]($lLV3) + RyF7) % PPiZmF8;
        var SZhNBYzij13 = "";
        var jspD14 = "";
        for (var tJFiW4 = 0; tJFiW4 < fKLgsG1["\x6c\x65\x6e\x67\x74\x68"]; tJFiW4++) {
            SZhNBYzij13 = window["\x70\x61\x72\x73\x65\x49\x6e\x74"](fKLgsG1["\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74"](tJFiW4) ^ window["\x4d\x61\x74\x68"]["\x66\x6c\x6f\x6f\x72"](($lLV3 / PPiZmF8) * 255));
            if (SZhNBYzij13 < 16) {
                jspD14 += "\x30" + SZhNBYzij13["\x74\x6f\x53\x74\x72\x69\x6e\x67"](16);
            } else {
                jspD14 += SZhNBYzij13["\x74\x6f\x53\x74\x72\x69\x6e\x67"](16);
            }
        }
        sXHJlrE9 = sXHJlrE9["\x74\x6f\x53\x74\x72\x69\x6e\x67"](16);
        while (sXHJlrE9["\x6c\x65\x6e\x67\x74\x68"] < 8) sXHJlrE9 = "\x30" + sXHJlrE9;
        jspD14 += sXHJlrE9;
        return jspD14;
    },
    createRandomString()
    {
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < 20; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    randomRange(min, max)
    {
      var returnStr = "",
          range = (max ? Math.round(Math.random() * (max-min)) + min : min),
          arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      for(var i=0; i<range; i++)
      {
          var index = Math.round(Math.random() * (arr.length-1));
          returnStr += arr[index];
      }
      return returnStr;
    }
}

export default myUtils