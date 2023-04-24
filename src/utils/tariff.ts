import Tariff from "../interfaces/tariff.interface";

export const tariffs: Tariff[] = [
    {
        'year': '2023',
        'internet': 39,
        'television': 49,
        'phone': 29,
        'decoder': 29,
    },
    {
        'year': '2024',
        'internet': 49,
        'television': 49,
        'phone': 29,
        'decoder': 29,
    },
    {
        'year': '2025',
        'internet': 59,
        'television': 59,
        'phone': 29,
        'decoder': 29,
    },
];

const promotions = [
    {
        'year': '2023',
        'internet + television': 79,
        'internet + phone': 64
    },
    {
        'year': '2024',
        'internet + television': 89,
        'internet + phone': 64
    },
    {
        'year': '2025',
        'internet + television': 99,
        'internet + phone': 64
    },
]

export const calculateTariff = (year: string, internet: boolean, television: boolean, phone: boolean, decoder: boolean): number => {
    let total = calculateNoPromotionTariff(year, internet, television, phone, decoder);

    if (internet && television) {
        let totalWithTelevisionPromotion = calculateTelevisionPromotion(year, phone);

        if (total > totalWithTelevisionPromotion) {
            total = totalWithTelevisionPromotion;
        }
    }

    if (internet && phone) {
        let totalWithPhonePromotion = calculatePhonePromotion(year, television, decoder);

        if (total > totalWithPhonePromotion) {
            total = totalWithPhonePromotion;
        }
    }

    return total;
};

const calculateTelevisionPromotion = (year: string, phone: boolean) => {
    const currentTraffi = tariffs.find(traffi => traffi.year === year)!;
    let total = promotions.find(promotion => promotion.year === year)?.["internet + television"]!;

    if (phone) {
        total += currentTraffi.phone;
    }

    return total;
}

const calculatePhonePromotion = (year: string, television: boolean, decoder: boolean) => {
    const currentTraffi = tariffs.find(traffi => traffi.year === year)!;
    let total = promotions.find(promotion => promotion.year === year)?.["internet + phone"]!;

    if (television) {
        total += currentTraffi.television;
    }

    if (decoder) {
        total += currentTraffi.decoder;
    }

    return total;
}

const calculateNoPromotionTariff = (year: string, internet: boolean, television: boolean, phone: boolean, decoder: boolean): number => {
    const currentTraffi = tariffs.find(traffi => traffi.year === year)!;
    let total = 0;

    if (internet) {
        total += currentTraffi.internet;
    }

    if (television) {
        total += currentTraffi.television;

        if (decoder) {
            total += currentTraffi.decoder;
        }
    }

    if (phone) {
        total += currentTraffi.phone;
    }

    return total;
}
