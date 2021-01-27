import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& .cls-1': {
      fill: '#d45c41'
    },
    '& .cls-2': {
      fill: '#ffa680'
    },
    '& .cls-3': {
      fill: '#f87553'
    },
    '& .cls-4': {
      fill: theme.palette.type === 'light' ? '#242424' : fade('#fff',0.8)
    },
    '& .cls-5': {
      fill: '#188a8a'
    }
  }
}))

const Logo = () => {

  const classes = useStyles();

  return (
    <svg className={ classes.root } viewBox="0 0 1353 329" fill="none">
      <path 
        d="M313.228 283.834C318.86 290.307 314.26 300.402 305.68 300.398L92.5321 300.321C87.0093 300.319 82.534 295.841 82.5364 290.318L82.6404 45.55C82.6443 36.3046 94.116 32.0147 100.185 38.9892L313.228 283.834Z"
        className="cls-1"
      />
      <path 
        d="M308.122 155.503C314.706 159.37 314.701 168.891 308.115 172.753L95.7606 297.256C89.0926 301.165 80.7 296.355 80.7033 288.625L80.8092 39.4659C80.8125 31.7365 89.2091 26.9324 95.8739 30.8467L308.122 155.503Z"
        className="cls-2"
      />
      <path 
        d="M308.447 28.7019C316.994 28.705 321.598 38.7343 316.028 45.2177L98.2872 298.698C92.2397 305.738 80.6979 301.46 80.7018 292.179L80.8096 38.6194C80.812 33.0966 85.291 28.6211 90.8139 28.6231L308.447 28.7019Z"
        className="cls-3"
      />
      <path 
        className="cls-4"
        d="M440.428 243C435.788 243 432.108 241.72 429.388 239.16C426.828 236.6 425.548 233 425.548 228.36V88.44C425.548 83.8 426.828 80.2 429.388 77.64C432.108 75.08 435.788 73.8 440.428 73.8H527.068C531.708 73.8 535.308 74.84 537.868 76.92C540.428 79 541.708 81.96 541.708 85.8C541.708 89.8 540.428 92.92 537.868 95.16C535.308 97.24 531.708 98.28 527.068 98.28H455.788V144.84H522.268C526.908 144.84 530.508 145.88 533.068 147.96C535.628 150.04 536.908 153.08 536.908 157.08C536.908 160.92 535.628 163.88 533.068 165.96C530.508 168.04 526.908 169.08 522.268 169.08H455.788V218.52H527.068C531.708 218.52 535.308 219.64 537.868 221.88C540.428 223.96 541.708 227 541.708 231C541.708 234.84 540.428 237.8 537.868 239.88C535.308 241.96 531.708 243 527.068 243H440.428ZM690.593 245.16C678.273 245.16 666.593 243.56 655.553 240.36C644.673 237 635.793 232.52 628.913 226.92C625.233 224.2 623.393 220.36 623.393 215.4C623.393 212.04 624.353 209.16 626.273 206.76C628.353 204.2 630.753 202.92 633.473 202.92C636.353 202.92 639.633 204.04 643.313 206.28C650.193 211.24 657.393 214.84 664.913 217.08C672.433 219.32 680.753 220.44 689.873 220.44C701.553 220.44 710.513 218.44 716.753 214.44C722.993 210.28 726.113 204.28 726.113 196.44C726.113 190.36 723.153 185.72 717.233 182.52C711.473 179.16 701.793 175.96 688.193 172.92C674.113 169.88 662.673 166.36 653.873 162.36C645.073 158.36 638.433 153.24 633.953 147C629.473 140.76 627.233 132.84 627.233 123.24C627.233 113.32 630.033 104.44 635.633 96.6C641.233 88.76 648.993 82.68 658.913 78.36C668.993 73.88 680.273 71.64 692.753 71.64C715.633 71.64 734.273 77.72 748.673 89.88C750.753 91.64 752.193 93.4 752.993 95.16C753.953 96.76 754.433 98.84 754.433 101.4C754.433 104.76 753.393 107.72 751.313 110.28C749.393 112.68 747.073 113.88 744.353 113.88C742.753 113.88 741.233 113.64 739.793 113.16C738.513 112.68 736.753 111.8 734.513 110.52C727.953 105.72 721.553 102.2 715.313 99.96C709.233 97.56 701.713 96.36 692.753 96.36C681.873 96.36 673.233 98.6 666.833 103.08C660.593 107.4 657.473 113.48 657.473 121.32C657.473 127.88 660.273 132.92 665.873 136.44C671.473 139.96 680.993 143.24 694.433 146.28C708.673 149.48 720.193 153.08 728.993 157.08C737.953 160.92 744.753 165.88 749.393 171.96C754.193 178.04 756.593 185.64 756.593 194.76C756.593 204.68 753.793 213.48 748.193 221.16C742.753 228.68 734.993 234.6 724.913 238.92C714.993 243.08 703.553 245.16 690.593 245.16ZM841.759 222.12C849.759 222.6 853.759 226.2 853.759 232.92C853.759 236.76 852.159 239.72 848.959 241.8C845.919 243.72 841.519 244.52 835.759 244.2L829.279 243.72C802.399 241.8 788.959 227.4 788.959 200.52V148.2H776.959C772.639 148.2 769.279 147.24 766.879 145.32C764.639 143.4 763.519 140.6 763.519 136.92C763.519 133.24 764.639 130.44 766.879 128.52C769.279 126.6 772.639 125.64 776.959 125.64H788.959V103.56C788.959 99.24 790.319 95.8 793.039 93.24C795.759 90.68 799.439 89.4 804.079 89.4C808.559 89.4 812.159 90.68 814.879 93.24C817.599 95.8 818.959 99.24 818.959 103.56V125.64H839.359C843.679 125.64 846.959 126.6 849.199 128.52C851.599 130.44 852.799 133.24 852.799 136.92C852.799 140.6 851.599 143.4 849.199 145.32C846.959 147.24 843.679 148.2 839.359 148.2H818.959V202.68C818.959 214.52 824.399 220.84 835.279 221.64L841.759 222.12ZM962.033 123.24C966.673 123.24 970.353 124.52 973.073 127.08C975.793 129.64 977.153 133.08 977.153 137.4V230.52C977.153 234.68 975.713 238.04 972.833 240.6C970.113 243.16 966.513 244.44 962.033 244.44C957.713 244.44 954.273 243.24 951.713 240.84C949.153 238.44 947.873 235.16 947.873 231V225C944.193 231.4 939.233 236.36 932.993 239.88C926.753 243.24 919.713 244.92 911.873 244.92C883.073 244.92 868.673 228.76 868.673 196.44V137.4C868.673 133.08 870.033 129.64 872.753 127.08C875.473 124.52 879.073 123.24 883.553 123.24C888.193 123.24 891.873 124.52 894.593 127.08C897.313 129.64 898.673 133.08 898.673 137.4V196.68C898.673 205 900.353 211.16 903.713 215.16C907.073 219.16 912.353 221.16 919.553 221.16C927.873 221.16 934.513 218.44 939.473 213C944.593 207.4 947.153 200.04 947.153 190.92V137.4C947.153 133.08 948.513 129.64 951.233 127.08C953.953 124.52 957.553 123.24 962.033 123.24ZM1106.3 72.6C1110.78 72.6 1114.46 73.88 1117.34 76.44C1120.22 79 1121.66 82.36 1121.66 86.52V230.04C1121.66 234.36 1120.3 237.8 1117.58 240.36C1114.86 242.92 1111.26 244.2 1106.78 244.2C1102.3 244.2 1098.7 242.92 1095.98 240.36C1093.26 237.8 1091.9 234.36 1091.9 230.04V224.04C1088.38 230.6 1083.26 235.72 1076.54 239.4C1069.98 243.08 1062.46 244.92 1053.98 244.92C1043.9 244.92 1034.86 242.36 1026.86 237.24C1019.02 232.12 1012.86 224.92 1008.38 215.64C1004.06 206.2 1001.9 195.4 1001.9 183.24C1001.9 171.08 1004.06 160.44 1008.38 151.32C1012.86 142.2 1019.02 135.16 1026.86 130.2C1034.7 125.24 1043.74 122.76 1053.98 122.76C1062.46 122.76 1069.98 124.52 1076.54 128.04C1083.1 131.56 1088.14 136.52 1091.66 142.92V86.04C1091.66 82.04 1092.94 78.84 1095.5 76.44C1098.22 73.88 1101.82 72.6 1106.3 72.6ZM1061.9 221.64C1071.5 221.64 1078.86 218.36 1083.98 211.8C1089.26 205.24 1091.9 195.88 1091.9 183.72C1091.9 171.56 1089.26 162.28 1083.98 155.88C1078.86 149.32 1071.58 146.04 1062.14 146.04C1052.54 146.04 1045.1 149.24 1039.82 155.64C1034.54 162.04 1031.9 171.24 1031.9 183.24C1031.9 195.4 1034.54 204.84 1039.82 211.56C1045.1 218.28 1052.46 221.64 1061.9 221.64ZM1234.36 131.88C1235.64 129 1237.32 126.92 1239.4 125.64C1241.64 124.2 1244.04 123.48 1246.6 123.48C1250.28 123.48 1253.56 124.76 1256.44 127.32C1259.48 129.72 1261 132.76 1261 136.44C1261 138.2 1260.52 140.04 1259.56 141.96L1194.04 279.24C1191.32 284.68 1187.08 287.4 1181.32 287.4C1177.64 287.4 1174.36 286.2 1171.48 283.8C1168.76 281.56 1167.4 278.68 1167.4 275.16C1167.4 273.4 1167.88 271.4 1168.84 269.16L1185.16 234.84L1140.52 141.96C1139.72 140.36 1139.32 138.52 1139.32 136.44C1139.32 132.76 1140.84 129.64 1143.88 127.08C1147.08 124.52 1150.68 123.24 1154.68 123.24C1157.4 123.24 1159.88 123.96 1162.12 125.4C1164.36 126.68 1166.12 128.76 1167.4 131.64L1201 205.8L1234.36 131.88Z"
      />
      <ellipse cx="590.373" cy="164.5" rx="24.3735" ry="22.5" className='cls-5'/>
    </svg>
  );
}

export default Logo;