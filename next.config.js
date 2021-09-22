module.exports = {
    productionBrowserSourceMaps: true,
    distDir: 'build',
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }

        return config
    }
}

return {
    "/": { page: "/" },
    "/products": { page: "/products" },
    "/about-us": { page: "/about-us" },
    "/payement-and-delivery": { page: "/payement-and-delivery" },
    "/contacts": { page: "/contacts" },
    "/basket": { page: "/basket" },
    "/promotions": { page: "/promotions" },

    //"/product/1": { page: "/product/[id]", query: { id: '1' }},
    // "/product/2": { page: "/product/[id]", query: { id: '2' }},
    // "/product/3": { page: "/product/[id]", query: { id: '3' }},
    // "/product/4": { page: "/product/[id]", query: { id: '4' } },
    // "/product/5": { page: "/product/[id]", query: { id: '5' } },
    // "/product/6": { page: "/product/[id]", query: { id: '6' } },
    // "/product/7": { page: "/product/[id]", query: { id: '7' } },
    // "/product/8": { page: "/product/[id]", query: { id: '8' } },
    // "/product/9": { page: "/product/[id]", query: { id: '9' } },
    // "/product/10": { page: "/product/[id]", query: { id: '10' } },
    // "/product/11": { page: "/product/[id]", query: { id: '11' } },
    // "/product/12": { page: "/product/[id]", query: { id: '12' } },
    // "/product/13": { page: "/product/[id]", query: { id: '13' } },
    // "/product/18": { page: "/product/[id]", query: { id: '18' } },
    // "/product/19": { page: "/product/[id]", query: { id: '19' } },
    // "/product/20": { page: "/product/[id]", query: { id: '20' } },
    // "/product/21": { page: "/product/[id]", query: { id: '21' } },
    // "/product/22": { page: "/product/[id]", query: { id: '22' } },
    // "/product/23": { page: "/product/[id]", query: { id: '23' } },
    // "/product/24": { page: "/product/[id]", query: { id: '24' } },
    // "/product/25": { page: "/product/[id]", query: { id: '25' } },
    // "/product/26": { page: "/product/[id]", query: { id: '26' } }

    "/AdminPanel/Account": { page: "/AdminPanel/Account" },
    "/AdminPanel/Dashboard": { page: "/AdminPanel/Dashboard" },
    "/AdminPanel/Products": { page: "/AdminPanel/Products" },
    "/AdminPanel/Settings": { page: "/AdminPanel/Settings" },
    "/AdminPanel/Top": { page: "/AdminPanel/Top" },
}