//карточки для ленты заказа 
import { useLocation } from "react-router";

const OrderCard = () => {
    const location = useLocation();
    const date = () => {
        return <FormattedDate date={new Date(el.createdAt)} />
    };

    return (
        <>
        </>
    )
}