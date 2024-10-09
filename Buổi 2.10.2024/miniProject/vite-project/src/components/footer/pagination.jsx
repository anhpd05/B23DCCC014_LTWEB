import { Pagination } from "antd";

const PaginationPage = (props) => {
  const {
    currentPage,
    setCurrentPage,
    setPageSize,
    setLoading,
    pageSize,
    filteredTasks,
  } = props;

  // Xử lý khi thay đổi trang
  const handlePageChange = (page, pageSize) => {
    setLoading(true);
    setCurrentPage(page);
    setPageSize(pageSize);

    // Giả lập loading để tạo hiệu ứng
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredTasks.length}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
        align="end"
        showTotal={(total) => `Tổng cộng ${total} công việc`}
        pageSizeOptions={["5", "10", "20", "50"]}
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      />
    </>
  );
};
export default PaginationPage;
