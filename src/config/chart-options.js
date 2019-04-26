export default {
    chartTypes: [
        {
            name: "line",
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
            isPolar: true,
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
