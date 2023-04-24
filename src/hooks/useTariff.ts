import { useEffect, useState } from "react";
import Tariff from "../interfaces/tariff.interface";
import { calculateTariff, tariffs } from "../utils/tariff";
import Service from "../interfaces/service.interface";

type tarrifOptions = {
    [Property in keyof Service]: boolean;
}

const initialTarrifOptions: tarrifOptions = {
    internet: false,
    television: false,
    phone: false,
    decoder: false
}

const useTariff = (): [(newYear: string) => void, (newValue: boolean, option: string) => void, Tariff, tarrifOptions, string[], number] => {
    const [currentTariff, setCurrentTariff] = useState<Tariff>(tariffs[0]);
    const [options, setOptions] = useState<tarrifOptions>(initialTarrifOptions);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setTotal(calculateTariff(currentTariff.year, options.internet, options.television, options.phone, options.decoder));
    }, [options, currentTariff]);

    const changeTariffYear = (newYear: string) => {
        const newTariff = tariffs.find(tariff => tariff.year === newYear);

        if (!newTariff) return;

        setCurrentTariff(newTariff);
    }

    const changeOption = (newValue: boolean, option: string) => {
        if (options[option as keyof tarrifOptions] === newValue) return;

        setOptions(prev => ({ ...prev, [option]: newValue }));
    }

    const availableYears = tariffs.map(tariff => tariff.year);

    return [changeTariffYear, changeOption, currentTariff, options, availableYears, total];
}

export default useTariff;