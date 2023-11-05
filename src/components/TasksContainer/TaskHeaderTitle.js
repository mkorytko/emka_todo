import React, {
    memo, useCallback, useEffect, useMemo, useState,
} from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderAction } from "../../store/actions/app";
import IconButton from "../IconButton";

import arrowDown from "../../assets/img/arrowDown.svg";
import arrowUp from "../../assets/img/arrowUp.svg";

function TaskHeaderTitle(props) {
    const {
        title,
        order,
        orderCol,
        name,
        src,
    } = props;
    const [innerOrder, setInnerOrder] = useState(order);
    const { order: appOrder, orderCol: appOrderCol } = useSelector((store) => store.app);
    const dispatch = useDispatch();

    const isActiveSort = useMemo(() => appOrderCol === orderCol, [appOrderCol]);

    const renderOrderDirection = useMemo(() => {
        if (appOrderCol === orderCol) {
            if (innerOrder === "asc") {
                return arrowUp;
            }
            return arrowDown;
        }
        return false;
    }, [appOrder, appOrderCol]);

    useEffect(() => {
        if (appOrderCol !== orderCol && innerOrder !== "asc") {
            setInnerOrder("asc");
        }
    }, [appOrderCol, innerOrder]);

    const handleOrder = useCallback(() => {
        if (!order) {
            return false;
        }
        let newAppOrder;
        if (appOrderCol !== orderCol) {
            newAppOrder = innerOrder;
        } else {
            newAppOrder = appOrder === "asc" ? "desc" : "asc";
        }
        setInnerOrder(newAppOrder);
        return dispatch(changeOrderAction(orderCol, newAppOrder));
    }, [appOrder, appOrderCol, orderCol, innerOrder]);

    return (
        <th
            className={name}
            scope="col">
            <div className="title">
                <IconButton
                    disabled={!order}
                    onClick={handleOrder}
                    icon={src}
                    className={classnames("title__button sm no-hover", {
                        sort__active: Boolean(order),
                    })}
                    alt="sort-icon">
                    {src ? (
                        <img
                            src={src}
                            alt="title-icon" />
                    ) : (
                        <span>
                            {title}
                        </span>
                    )}
                    {isActiveSort && (
                        <img
                            className="order-direction"
                            src={renderOrderDirection}
                            alt="" />
                    )}
                </IconButton>
            </div>
        </th>
    );
}

TaskHeaderTitle.propTypes = {
    title: PropTypes.string,
    order: PropTypes.string,
    name: PropTypes.string,
    src: PropTypes.string,
    orderCol: PropTypes.string,
};

export default memo(TaskHeaderTitle);
