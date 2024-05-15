import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; // svg component

Vue.component("svg-icon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
requireAll(req);
