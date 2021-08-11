import React from "react";
import asyncComponent from '../utility/asyncComponent'

export default asyncComponent(() => import("../components/ErrorsPage/error_404/Error404"));
