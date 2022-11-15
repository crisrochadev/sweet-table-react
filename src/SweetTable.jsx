import React, { useEffect, useState } from "react";
import "./style.css";
export default function SweetTable({
  rows,
  columns,
  rowKey,
  columnKey,
  perPage,
  fetchPerPage,
  setPerPage,
  listItemsPerPage,
  rowsSize,
  filters,
  propertyFilter,
}) {
  const size = rowsSize ? rowsSize : data.length;
  const row_key = rowKey ? rowKey : "id";
  const column_key = columnKey ? columnKey : "title";
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [openFilterList, setOpenFilterList] = useState(false);
  const [textFilter, setTextFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState({
    id: 9,
    label: "Tem 31 anos",
    property: "age",
    operator: "==",
    filter: "31",
  });
  const listPerPage = listItemsPerPage
    ? listItemsPerPage
    : size > 30
    ? [
        Math.round(size / 10),
        Math.round(size / 10 + 5),
        Math.round(size / 10 + 10),
        Math.round(size / 10 + 15),
      ]
    : [
        Math.round(size / 4),
        Math.round(size / 4 + 2),
        Math.round(size / 4 + 4),
        Math.round(size / 4 + 6),
      ];
  useEffect(() => {
    if (!fetchPerPage) {
      const r = rows.filter((row, index) => index < perPage);
      setData(r);
    } else setData(rows);
  }, [perPage]);
  function getDataperPage(initial, final) {
    const r = rows.filter((row, index) => index >= initial && index <= final);
    setData(r);
  }
  function previousPage() {
    if (pageNumber === 1) return;
    let number = pageNumber;
    number--;
    setPageNumber(number);
    setPagination(number);
    const initial = pageNumber * perPage;
    const final = initial + perPage;
    console.log(initial, final);
    getDataperPage(initial, final);
  }
  function nextPage() {
    // if(pageNumber * perPage >= data.length) return
    console.log(perPage * pageNumber);
    let number = pageNumber;
    number++;
    setPageNumber(number);
    setPagination(number);
    const initial = pageNumber * perPage;
    const final = initial + perPage;

    if (final >= size) return;
    getDataperPage(initial, final);
  }
  function getPageByNumber(page) {
    setPageNumber(page);
    setPagination(page);
    const numberInitial = page - 1;
    let initial = numberInitial * perPage;
    let final = initial + perPage;
    if (page === size / perPage) {
      initial = size - perPage;
      final = size;
    }
    getDataperPage(initial, final);
  }
  function handleOperator(operator, property, filter) {
    switch (operator) {
      case ">":
        return property > filter;
        break;
      case "<":
        return property < filter;
        break;
      case "==":
        return property == filter;
        break;
      case "===":
        return property === filter;
        break;
      case "!==":
        return property !== filter;
        break;
      case "!=":
        return property != filter;
        break;
      case ">=":
        return property >= filter;
        break;
      case "<=":
        return property <= filter;
        break;
      case "startsWith":
        console.log("aqui");
        return property.startsWith(filter);
        break;
      case "endsWith":
        return property.endsWith(filter);
        break;
      case "includes":
        return property.includes(filter);
        break;
      default:
        return property === property;
        break;
    }
  }
  function handleFilter(item) {
    setFilter(item);
    const filtered = rows.filter((row) => {
      if (item.logicalOparator !== undefined) {
        if (item.logicalOparator.logical === "&&") {
          if (
            handleOperator(
              item.logicalOparator.operator1,
              row[item.property],
              item.logicalOparator.filter1
            ) &&
            handleOperator(
              item.logicalOparator.operator2,
              row,
              item.logicalOparator.filter2
            )
          )
            return item;
        }
        if (item.logicalOparator.logical == "||") {
          console.log(item.property);

          if (
            handleOperator(
              item.logicalOparator.operator1,
              row[item.property],
              item.logicalOparator.filter1
            ) ||
            handleOperator(
              item.logicalOparator.operator2,
              row[item.property],
              item.logicalOparator.filter2
            )
          )
            return item;
        } else return item;
      } else {
        if (handleOperator(item.operator, row[item.property], item.filter))
          return item;
      }
    });
    console.log(filtered);
    setData(filtered);
    setOpenFilterList(false);
  }
  function handleTextFilter(value) {
    setTextFilter(value, propertyFilter);
    if (value === "") setData(rows);
    else {
      const filtered = rows.filter((row) =>
        row[propertyFilter].toLowerCase().startsWith(value.toLowerCase())
      );
      setData(filtered);
    }
  }
  return (
    <div className="sweet">
      <div className="sweet_header_filter">
        <div className="sweet_select_filter">
          <p onClick={() => setOpenFilterList(!openFilterList)}>
            {filter.label}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
            </svg>
          </p>
          <div
            className={`${
              openFilterList
                ? "sweet_list_options_filter"
                : "sweet_list_options_filter_hidden"
            }`}
          >
            {filters.map((item, index) => (
              <div key={item.id} className="sweet_option_filter">
                <p onClick={() => handleFilter(item)}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {propertyFilter !== undefined && (
          <div className="sweet_text_filter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
            <input
              type="text"
              value={textFilter}
              onChange={(e) => handleTextFilter(e.target.value)}
            />
          </div>
        )}
      </div>
     <div class="sweet_table_content">
     <table className="sweet_table">
        <thead className="sweet_head">
          <tr className="sweet_head_row">
            {columns.map((column) => (
              <th
              className="sweet_head_col"
                style={{
                  width: `${column["width"] ? column["width"] : 100}px`,
                }}
                key={column[row_key]}
              >
                <div>{column[column_key]}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="sweet_body">
          {data.map((row) => (
            <tr key={row[row_key]} className="sweet_body_row">
              {columns.map((column) => (
                <td
                className="sweet_body_col"
                  style={{
                    width: `${column["width"] ? column["width"] : 100}px`,
                  }}
                  key={column[column_key]}
                >
                  <div>
                    {column.element
                      ? column.element
                      : typeof row[column[column_key]] !== "object" &&
                        row[column[column_key]]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     </div>
      <div>
        <div className="sweet_pagination">
          <div>
            <select className="sweet_select_per_page" onChange={(e) => setPerPage(parseInt(e.target.value))}>
              {listPerPage.map((item, index) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
              <option value={size}>Tudo</option>
            </select>
          </div>
          <button className="sweet_button_previous" onClick={previousPage}>Voltar</button>
          <div>
            <button onClick={() => getPageByNumber(1)}>1</button>
          </div>
          <div className="sweet_separator_pagination">...</div>
          <div>
            <button className="sweet_button_page" onClick={() => getPageByNumber(pagination + 1)}>
              {pagination + 1}
            </button>
            <button className="sweet_button_page" onClick={() => getPageByNumber(pagination + 2)}>
              {pagination + 2}
            </button>
            <button className="sweet_button_page" onClick={() => getPageByNumber(pagination + 3)}>
              {pagination + 3}
            </button>
          </div>
          <div className="sweet_separator_pagination">...</div>
          <div>
            <button className="sweet_button_page" onClick={() => getPageByNumber(Math.round(size / perPage))}>
              {Math.round(size / perPage)}
            </button>
          </div>
          <button className="sweet_button_next" onClick={nextPage}>Ir</button>
        </div>
      </div>
    </div>
  );
}
