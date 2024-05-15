import Vue from "vue";
import Clipboard from "./clipboard/clipboard";
import WaterMask from "./watermask/index.js";

Vue.directive("watermask", WaterMask);

Vue.directive("Clipboard", Clipboard);
