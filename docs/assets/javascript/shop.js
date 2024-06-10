document.addEventListener("DOMContentLoaded", () => {
  // Utils
  const isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const humanizeGraphQLResponse = (input) => {
    if (!input) return null;
    const output = {};

    Object.keys(input).forEach((key) => {
      if (input[key] && input[key].edges) {
        output[key] = input[key].edges.map((edge) =>
          humanizeGraphQLResponse(edge.node),
        );
      } else if (isObject(input[key])) {
        output[key] = humanizeGraphQLResponse(input[key]);
      } else {
        output[key] = input[key];
      }
    });

    return output;
  };

  const formatPrice = (price) => {
    const { amount, currencyCode } = price;
    return `${CURRENCIES[currencyCode]}${Math.trunc(amount)}`;
  };

  const getId = (id) => {
    const parts = id.split("/");
    return parts[parts.length - 1];
  };

  const getProductFromVariant = (variantId) => {
    let product = {};
    let variant = {};

    state.products.forEach((p) => {
      const foundVariant = p.variants.find((v) => {
        return v.id === variantId;
      });

      if (foundVariant) {
        product = p;
        variant = foundVariant;
      }
    });

    return {
      product,
      variant,
    };
  };

  const STORAGE_CART_ID = "bulma-shop-cart-id";

  const CURRENCIES = {
    AED: "د.إ",
    AFN: "؋",
    ALL: "L",
    AMD: "֏",
    ANG: "ƒ",
    AOA: "Kz",
    ARS: "$",
    AUD: "$",
    AWG: "ƒ",
    AZN: "₼",
    BAM: "KM",
    BBD: "$",
    BDT: "৳",
    BGN: "лв",
    BHD: ".د.ب",
    BIF: "FBu",
    BMD: "$",
    BND: "$",
    BOB: "$b",
    BOV: "BOV",
    BRL: "R$",
    BSD: "$",
    BTC: "₿",
    BTN: "Nu.",
    BWP: "P",
    BYN: "Br",
    BYR: "Br",
    BZD: "BZ$",
    CAD: "$",
    CDF: "FC",
    CHE: "CHE",
    CHF: "CHF",
    CHW: "CHW",
    CLF: "CLF",
    CLP: "$",
    CNH: "¥",
    CNY: "¥",
    COP: "$",
    COU: "COU",
    CRC: "₡",
    CUC: "$",
    CUP: "₱",
    CVE: "$",
    CZK: "Kč",
    DJF: "Fdj",
    DKK: "kr",
    DOP: "RD$",
    DZD: "دج",
    EEK: "kr",
    EGP: "£",
    ERN: "Nfk",
    ETB: "Br",
    ETH: "Ξ",
    EUR: "€",
    FJD: "$",
    FKP: "£",
    GBP: "£",
    GEL: "₾",
    GGP: "£",
    GHC: "₵",
    GHS: "GH₵",
    GIP: "£",
    GMD: "D",
    GNF: "FG",
    GTQ: "Q",
    GYD: "$",
    HKD: "$",
    HNL: "L",
    HRK: "kn",
    HTG: "G",
    HUF: "Ft",
    IDR: "Rp",
    ILS: "₪",
    IMP: "£",
    INR: "₹",
    IQD: "ع.د",
    IRR: "﷼",
    ISK: "kr",
    JEP: "£",
    JMD: "J$",
    JOD: "JD",
    JPY: "¥",
    KES: "KSh",
    KGS: "лв",
    KHR: "៛",
    KMF: "CF",
    KPW: "₩",
    KRW: "₩",
    KWD: "KD",
    KYD: "$",
    KZT: "₸",
    LAK: "₭",
    LBP: "£",
    LKR: "₨",
    LRD: "$",
    LSL: "M",
    LTC: "Ł",
    LTL: "Lt",
    LVL: "Ls",
    LYD: "LD",
    MAD: "MAD",
    MDL: "lei",
    MGA: "Ar",
    MKD: "ден",
    MMK: "K",
    MNT: "₮",
    MOP: "MOP$",
    MRO: "UM",
    MRU: "UM",
    MUR: "₨",
    MVR: "Rf",
    MWK: "MK",
    MXN: "$",
    MXV: "MXV",
    MYR: "RM",
    MZN: "MT",
    NAD: "$",
    NGN: "₦",
    NIO: "C$",
    NOK: "kr",
    NPR: "₨",
    NZD: "$",
    OMR: "﷼",
    PAB: "B/.",
    PEN: "S/.",
    PGK: "K",
    PHP: "₱",
    PKR: "₨",
    PLN: "zł",
    PYG: "Gs",
    QAR: "﷼",
    RMB: "￥",
    RON: "lei",
    RSD: "Дин.",
    RUB: "₽",
    RWF: "R₣",
    SAR: "﷼",
    SBD: "$",
    SCR: "₨",
    SDG: "ج.س.",
    SEK: "kr",
    SGD: "S$",
    SHP: "£",
    SLL: "Le",
    SOS: "S",
    SRD: "$",
    SSP: "£",
    STD: "Db",
    STN: "Db",
    SVC: "$",
    SYP: "£",
    SZL: "E",
    THB: "฿",
    TJS: "SM",
    TMT: "T",
    TND: "د.ت",
    TOP: "T$",
    TRL: "₤",
    TRY: "₺",
    TTD: "TT$",
    TVD: "$",
    TWD: "NT$",
    TZS: "TSh",
    UAH: "₴",
    UGX: "USh",
    USD: "$",
    UYI: "UYI",
    UYU: "$U",
    UYW: "UYW",
    UZS: "лв",
    VEF: "Bs",
    VES: "Bs.S",
    VND: "₫",
    VUV: "VT",
    WST: "WS$",
    XAF: "FCFA",
    XBT: "Ƀ",
    XCD: "$",
    XOF: "CFA",
    XPF: "₣",
    XSU: "Sucre",
    XUA: "XUA",
    YER: "﷼",
    ZAR: "R",
    ZMW: "ZK",
    ZWD: "Z$",
    ZWL: "$",
  };

  const CART_QL = `
    id
    createdAt
    updatedAt
    checkoutUrl
    buyerIdentity {
      countryCode
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
            }
          }
        }
      }
    }
  `;

  const COST_QL = `
    cost {
      totalAmount {
        amount
        currencyCode
      }
      # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
      subtotalAmount {
        amount
        currencyCode
      }
      # The estimated tax amount for the customer to pay at checkout.
      totalTaxAmount {
        amount
        currencyCode
      }
      # The estimated duty amount for the customer to pay at checkout.
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  `;

  // State
  const state = {
    cart: {},
    products: [],
    isLoading: false,
    hasFetchedProducts: false,
    countryCode: null,
  };

  // UI
  const $cart = document.getElementById("cart");
  const $cartClose = document.querySelectorAll(".shop-cart-close");
  const $openCart = document.getElementById("open-cart");
  const $emptyCart = document.getElementById("empty-cart");
  const $fullCart = document.getElementById("full-cart");
  const $cartItems = document.getElementById("cart-items");
  const $products = document.getElementById("products");
  const $modal = document.getElementById("shop-modal");
  const $modalClose = document.querySelectorAll(".shop-modal-close");

  $cartClose.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      $cart.classList.remove("is-active");
    });
  });

  $openCart.addEventListener("click", (event) => {
    event.preventDefault();
    $cart.classList.add("is-active");
  });

  $modalClose.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      closeModal();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $cart.classList.remove("is-active");
      closeModal();
    }
  });

  const closeModal = () => {
    $modal.classList.remove("is-active");
  };

  const openModal = (product) => {
    $title = $modal.querySelector(".modal-title");
    $body = $modal.querySelector(".modal-body");
    $buttons = $modal.querySelector(".modal .buttons");
    $close = $modal.querySelector(".modal .buttons .button.is-close");

    $title.replaceChildren();
    buildHeading($title, product);

    $body.replaceChildren();
    $body.className = `modal-body block shop-product shop-product-${getId(product.id)}`;

    buildDescription($body, product, false);
    buildOptions($body, product);

    $buttons.replaceChildren();
    buildAddButton($buttons, product);

    $modal.classList.add("is-active");

    update();
  };

  const buildHeading = (el, product) => {
    const { priceRange, title } = product;
    const { minVariantPrice: min } = priceRange;

    const $heading = El("shop-product-heading");

    const $h3 = El("shop-product-title", "h3");
    $h3.innerText = title;
    $heading.appendChild($h3);

    const $price = El("shop-product-price");
    $price.appendChild(Price(min));
    $heading.appendChild($price);

    el.appendChild($heading);
  };

  const buildSizeGuide = (desc) => {
    if (!desc) {
      return;
    }

    const parts = desc.split('<p><strong class="size-guide-title">');
    const first = parts[0];

    if (parts.length === 1) {
      return first;
    }

    const items = parts[1].split("Size guide</strong></p>");

    if (parts.length === 1) {
      return items[0];
    }

    return `
      ${first}
      <details>
        <summary>Size Guide</summary>
        ${items[1]}
      </details>
    `;
  };

  const buildDescription = (el, product) => {
    const { descriptionHtml } = product;

    const $description = El("shop-product-description");
    const $tagline = El("shop-product-tagline");
    const $rest = El("shop-product-rest content");

    const { first, rest } = truncateDescription(descriptionHtml);

    $tagline.innerHTML = first;
    $rest.innerHTML = buildSizeGuide(rest);

    $description.appendChild($tagline);
    $description.appendChild($rest);
    el.appendChild($description);
  };

  const buildOptions = (el, product) => {
    const { variants } = product;

    const $options = El("buttons has-addons are-small variants");
    $options.className += variants.length > 1 ? " multiple" : " single";

    if (variants.length > 1) {
      variants.forEach((variant) => {
        const { id, title } = variant;

        const $option = El("button", "button");
        $option.dataset.id = id;
        $option.innerText = title;

        $option.addEventListener("click", (event) => {
          event.preventDefault();
          product.selectedVariant = id;
          update();
        });

        $options.appendChild($option);
      });

      el.appendChild($options);
    }
  };

  const buildAddButton = (el, product) => {
    const $buy = El("button is-primary is-medium", "button");
    $buy.innerText = "Add to cart";

    $buy.addEventListener("click", async (event) => {
      event.preventDefault();
      await addToCart(product.selectedVariant);
      closeModal();
    });

    el.appendChild($buy);
  };

  // Update Cycle
  const updateProducts = () => {
    if (state.hasFetchedProducts) {
      $products.classList.add("has-loaded");
    }

    if ($products.childElementCount > 4) {
      return;
    }

    state.products.forEach((product) => {
      const { id, availableForSale, featuredImage } = product;

      if (!availableForSale) {
        return;
      }

      const el = El(`shop-product shop-product-${getId(product.id)}`);
      el.dataset.id = id;

      const $figure = El("shop-product-image image is-square", "figure");
      const $img = document.createElement("img");
      $img.src = featuredImage.url;
      $figure.appendChild($img);
      el.appendChild($figure);

      $figure.addEventListener("click", async (event) => {
        event.preventDefault();
        openModal(product);
      });

      buildHeading(el, product);
      buildDescription(el, product);
      buildOptions(el, product);

      const $buttons = El("shop-product-buttons buttons");

      buildAddButton($buttons, product);

      const $more = El("button is-text", "button");
      $more.innerText = "Learn more";
      $buttons.appendChild($more);

      $more.addEventListener("click", async (event) => {
        event.preventDefault();
        openModal(product);
      });

      el.appendChild($buttons);

      $products.appendChild(el);
    });
  };

  const updateCart = () => {
    if (isEmpty(state.cart)) {
      return;
    }

    const { checkoutUrl, cost, lines } = state.cart;

    if (lines.length > 0) {
      $openCart.classList.add("is-primary");
      $cartItems.replaceChildren();

      $emptyCart.style.display = "none";
      $fullCart.style.display = "block";

      lines.forEach((line) => {
        const variantId = line.merchandise.id;
        const { product, variant } = getProductFromVariant(variantId);

        const $item = El("media shop-item");
        $item.dataset.id = line.id;

        const $left = El("media-left");
        const $image = El("shop-item-image image is-64x64");
        const $img = El("", "img");

        if (product.featuredImage) {
          $img.src = product.featuredImage.url;
        }

        $image.appendChild($img);
        $left.appendChild($image);

        const $right = El("media-content");

        const $cost = El("shop-item-price");
        $cost.innerText = formatPrice(line.cost.totalAmount);
        $right.appendChild($cost);

        const $title = El("shop-item-title");
        $title.innerText = `${product.title}`;
        $right.appendChild($title);

        if (variant.title !== "Default Title") {
          const $tag = El(
            "shop-item-variant button is-primary is-small is-outlined",
            "span",
          );
          $tag.innerText = `${variant.title}`;
          $right.appendChild($tag);
        }

        const $quantity = El("shop-item-quantity button is-static", "span");
        $quantity.innerText = `${line.quantity}`;
        $right.appendChild($quantity);

        const $buttons = El("shop-item-actions");

        const $remove = El("button shop-item-remove is-small", "button");
        const $icon = Icon("fa-solid fa-trash-can");
        $remove.appendChild($icon);
        $remove.addEventListener("click", async (event) => {
          event.preventDefault();

          if (
            window.confirm(
              `Are you sure you want to remove this item from your cart?`,
            )
          ) {
            await removeFromCart(line.id);
          }
        });
        $buttons.appendChild($remove);

        const $addons = El("shop-item-buttons buttons are-small has-addons");

        const $plus = El("button", "button");
        const $plusIcon = Icon("fa-solid fa-plus");
        $plus.appendChild($plusIcon);
        $plus.addEventListener("click", async (event) => {
          event.preventDefault();
          await addToCart(variant.id);
        });

        const $minus = El("button", "button");
        const $minusIcon = Icon("fa-solid fa-minus");
        $minus.appendChild($minusIcon);
        $minus.addEventListener("click", async (event) => {
          event.preventDefault();

          if (line.quantity === 1) {
            if (
              window.confirm(
                `Are you sure you want to remove this item from your cart?`,
              )
            ) {
              await removeFromCart(line.id);
            }
          } else {
            await decreaseFromCart(line.id, line.quantity - 1);
          }
        });

        $addons.appendChild($minus);
        $addons.appendChild($quantity);
        $addons.appendChild($plus);

        $buttons.appendChild($addons);
        $right.appendChild($buttons);

        $item.appendChild($left);
        $item.appendChild($right);

        $cartItems.appendChild($item);
      });

      const $total = El("shop-total");
      const $totalLeft = El("shop-total-left");
      const $totalLabel = El("shop-total-label");
      $totalLabel.innerText = "Total";
      const $disclaimer = El("shop-total-disclaimer");
      $disclaimer.innerText =
        "Tax included and shipping and discounts calculated at checkout";
      const $totalRight = El("shop-total-amount");
      $totalRight.innerText = formatPrice(cost.totalAmount);
      $totalLeft.appendChild($totalLabel);
      $totalLeft.appendChild($disclaimer);
      $total.appendChild($totalLeft);
      $total.appendChild($totalRight);
      $cartItems.appendChild($total);

      const $checkout = El("button is-primary is-fullwidth", "a");
      $checkout.innerText = "Checkout";
      $checkout.href = checkoutUrl;
      $cartItems.appendChild($checkout);
    } else {
      $openCart.classList.remove("is-primary");
      $emptyCart.style.display = "block";
      $fullCart.style.display = "none";
    }
  };

  const updateButtons = () => {
    const $buttons = document.querySelectorAll(
      "#open-cart, #shop button.button, #shop-modal button.button",
    );

    $buttons.forEach((button) => {
      if (state.isLoading) {
        button.setAttribute("disabled", "");
      } else {
        button.removeAttribute("disabled");
      }
    });
  };

  const updateVariants = () => {
    state.products.forEach((product) => {
      const $blocs = document.querySelectorAll(
        `.shop-product-${getId(product.id)}`,
      );

      $blocs.forEach(($bloc) => {
        const $variants = $bloc.querySelectorAll(`.variants .button`);

        $variants.forEach(($el) => {
          if ($el.dataset.id === product.selectedVariant) {
            $el.classList.add("is-primary");
          } else {
            $el.classList.remove("is-primary");
          }
        });
      });
    });
  };

  const update = () => {
    updateProducts();
    updateCart();
    updateButtons();
    updateVariants();
  };

  // HTML Elements
  const El = (className = "", tag = "div") => {
    const el = document.createElement(tag);
    el.className = className;
    return el;
  };

  const Icon = (icon) => {
    const el = document.createElement("span");
    el.className = "icon";
    const i = document.createElement("i");
    i.className = icon;
    el.appendChild(i);
    return el;
  };

  const Price = (price) => {
    const { amount, currencyCode } = price;
    const el = El("shop-price", "span");
    el.innerText = `${CURRENCIES[currencyCode]}${Math.trunc(amount)}`;
    return el;
  };

  const truncateDescription = (desc) => {
    const parts = desc.split("<br>\n<br>\n");

    return {
      first: parts[0],
      rest: parts.slice(1).join(" "),
    };
  };

  // API calls
  const client = window.ShopifyStorefrontAPIClient.createStorefrontApiClient({
    storeDomain: "8df2f8-d5.myshopify.com",
    apiVersion: "2024-04",
    publicAccessToken: "e3764a4be9897a2d0531c4b5c2699c9f",
  });

  async function retrieveProducts() {
    let context = "";

    if (state.countryCode) {
      context = `@inContext(country: ${state.countryCode})`;
    }

    const query = `
      query allProducts ${context} {
        products(first: 10) {
          edges {
            node {
              id
              availableForSale
              description
              descriptionHtml
              featuredImage {
                height
                url
                width
              }
              handle
              images(first: 10) {
                edges {
                  node {
                    height
                    url
                    width
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              title
              variants(first: 10) {
                edges {
                  node {
                    availableForSale
                    id
                    price {
                      amount
                      currencyCode
                    }
                    title
                  }
                }
              }
            }
          }
        }
      }
  `;

    state.isLoading = true;
    update();

    try {
      const { data, errors } = await client.request(query);

      if (errors) {
        return console.error(errors);
      }

      const clean = humanizeGraphQLResponse(data);
      state.products = clean.products.map((product) => {
        return {
          ...product,
          selectedVariant: product.variants[0].id,
        };
      });
      state.hasFetchedProducts = true;
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    state.isLoading = false;
    update();
  }

  async function createCart() {
    const query = `
      mutation cartCreate {
        cartCreate (
          input: {}
        ) {
          cart {
            ${CART_QL}
            ${COST_QL}
          }
        }
      }
    `;

    state.isLoading = true;
    update();

    try {
      const { data, errors } = await client.request(query);

      if (errors) {
        return console.error(errors);
      }

      const clean = humanizeGraphQLResponse(data);
      state.cart = clean.cartCreate.cart;

      localStorage.setItem(STORAGE_CART_ID, clean.cartCreate.cart.id);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    state.isLoading = false;
    update();
  }

  async function retrieveCart(cartId) {
    const query = `
      {
        cart (
          id: "${cartId}"
        ) {
          ${CART_QL}
          ${COST_QL}
        }
      }
    `;

    state.isLoading = true;
    update();

    try {
      const { data, errors } = await client.request(query);

      if (errors) {
        createCart();
        return console.error(errors);
      }

      const clean = humanizeGraphQLResponse(data);
      state.cart = clean.cart;

      if (clean.cart.buyerIdentity.countryCode) {
        state.countryCode = clean.cart.buyerIdentity.countryCode;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      createCart();
    }

    state.isLoading = false;
    update();
  }

  async function addToCart(productId) {
    const query = `
      mutation cartAdd {
        cartLinesAdd (
          cartId: "${state.cart.id}"
          lines: {
            merchandiseId: "${productId}"
            quantity: 1
          }
        ) {
          cart {
            ${CART_QL}
            ${COST_QL}
          }
        }
      }
    `;

    state.isLoading = true;
    update();

    try {
      const { data, errors } = await client.request(query);

      if (errors) {
        return console.error(errors);
      }

      const clean = humanizeGraphQLResponse(data);
      state.cart = clean.cartLinesAdd.cart;

      $cart.classList.add("is-active");
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    state.isLoading = false;
    update();
  }

  async function removeFromCart(lineId) {
    const query = `
      mutation cartAdd {
        cartLinesRemove (
          cartId: "${state.cart.id}"
          lineIds: ["${lineId}"]
        ) {
          cart {
            ${CART_QL}
            ${COST_QL}
          }
        }
      }
    `;

    state.isLoading = true;
    update();

    try {
      const { data, errors } = await client.request(query);

      if (errors) {
        return console.error(errors);
      }

      const clean = humanizeGraphQLResponse(data);
      state.cart = clean.cartLinesRemove.cart;
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    state.isLoading = false;
    update();
  }

  async function decreaseFromCart(lineId, quantity) {
    const query = `
      mutation cartAdd {
        cartLinesUpdate (
          cartId: "${state.cart.id}"
          lines: {
            id: "${lineId}"
            quantity: ${quantity}
          }
        ) {
          cart {
            ${CART_QL}
            ${COST_QL}
          }
        }
      }
    `;

    state.isLoading = true;
    update();

    try {
      const { data, errors } = await client.request(query);

      if (errors) {
        return console.error(errors);
      }

      const clean = humanizeGraphQLResponse(data);
      state.cart = clean.cartLinesUpdate.cart;
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    state.isLoading = false;
    update();
  }

  // Init
  const init = async () => {
    const storedCart = localStorage.getItem(STORAGE_CART_ID);

    if (storedCart) {
      await retrieveCart(storedCart);
    } else {
      await createCart();
    }

    await retrieveProducts();
  };

  init();
});
