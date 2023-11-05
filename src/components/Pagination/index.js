import React, { memo, useMemo } from "react";
import RCPagination from "rc-pagination";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { changePageAction } from "../../store/actions/app";
import "./style.scss";

const locale = {
    items_per_page: "/ стр",
    jump_to: "Перейти",
    jump_to_confirm: "подтвердить",
    page: "",
    prev_page: "Назад",
    next_page: "Вперед",
    prev_5: "Предыдущие 5",
    next_5: "Следующие 5",
    prev_3: "Предыдущие 3",
    next_3: "Следующие 3",
};

function TasksPagination({ pagination, appPage, onChange }) {
    if (!pagination?.total || pagination?.total <= 3) {
        return null;
    }

    const {
        total,
        limit,
    } = pagination;

    const disabled = useMemo(() => total <= 3, [total]);

    return (
        <div className="Pagination__wrapper">
            <RCPagination
                disabled={disabled}
                onChange={onChange}
                locale={locale}
                current={appPage}
                pageSize={limit}
                showTitle
                total={total} />
        </div>
    );
}

TasksPagination.propTypes = {
    onChange: PropTypes.func.isRequired,
    pagination: PropTypes.shape({
        limit: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }),
    appPage: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
    pagination: store.app.pagination,
    appPage: store.app.page,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onChange: changePageAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(memo(TasksPagination));
