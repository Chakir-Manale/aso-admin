import React from "react";
import {AELabel} from "../../../../_ae/components/AELabel";
import {FormattedMessage} from "react-intl";
import {AEIcon} from "../../../../_ae/components/svg";

export const PAYMENT_METHODS = {
    CASH: {
        key: 'CASH',
        icon: '/Shopping/Money.svg',
        variant: 'info'
    },
    CMI: {
        key: 'CMI',
        // icon: '/Shopping/Money.svg',
        variant: 'primary'
    },
}

export const getPaymentMethodsKeys = () => Object.values(PAYMENT_METHODS).map(({key}) => key)
export const paymentMethodKeyExist = key => getPaymentMethodsKeys().includes(key)

export const PaymentMethod = ({method = PAYMENT_METHODS.CASH.key, ...props}) => {
    if (!paymentMethodKeyExist(method)) {
        return null;
    }
    const {key, icon, variant} = PAYMENT_METHODS[method];

    return (
        <AELabel variant={`-light-${variant}`} {...props}>
            <AEIcon
                variant={variant}
                path={icon}
            />
            <FormattedMessage id={key}/>
        </AELabel>
    )
}