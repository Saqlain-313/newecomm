import { JumperImage } from "./JumperImage";
import { ShoesBagImage } from "./ShoeBagImage";
import { CardigansImage } from "./CardigansImage";
import { KinittedImage } from "./KinittedImage";
import { SkirtImage } from "./SkirtImage";
import { Short } from "./Short";
import { Order } from "./order";
import { Mini } from "./Mini"
import { midaxi } from "./Midaxi";
import { Maxi } from "../store/Maxi";
import { Trouser } from "./Trouser";
import { Flare } from "./Flare";
import { Legg } from "./Legg";
import { Coat } from "./Coat";


export const AllProducts = [
    ...JumperImage,
    ...ShoesBagImage,
    ...CardigansImage,
    ...KinittedImage,
    ...SkirtImage,
    ...Short,
    ...Order,
    ...Mini,
    ...midaxi,
    ...Maxi,
    ...Trouser,
    ...Flare,
    ...Legg,
    ...Coat
    
];