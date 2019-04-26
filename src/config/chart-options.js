export default {
    chartTypes: [
        {
            name: "line",
            type: "line",
            isPolar: false,
            allowedParameters: [
                "title",
                "legend",
                "grid",
                "xAxis",
                "yAxis",
                "series",
            ],
        },
        {
            name: "bar (cartesian 2D)",
            type: "bar",
            isPolar: false,
            allowedParameters: [
                "title",
                "legend",
                "grid",
                "xAxis",
                "yAxis",
                "series",
            ],
        },
        {
            name: "bar (polar)",
            type: "bar",
            isPolar: true,
            allowedParameters: [
                "title",
                "legend",
                "polar",
                "radiusAxis",
                "angleAxis",
                "series",
            ],
        },
        {
            name: "pie",
            type: "pie",
            isPolar: false,
            allowedParameters: [
                "title",
                "legend",
                "polar",
                "radiusAxis",
                "angleAxis",
                "series",
            ],
        }
    ],
    legendAlign: ["left", "center", "right"],
};
