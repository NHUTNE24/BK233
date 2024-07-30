import { Modal } from "antd";
import Proptypes from 'prop-types';

export default function ModalBasic({
  content,
  width,
  title,
  onOpen,
  onOk,
  onCancel,
  cancelText,
  okText,
  isShowFooter = null,
}) {
  return (
    <Modal
      width={width}
      cancelText={cancelText}
      okText={okText}
      title={title}
      open={onOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={isShowFooter}
    >
      {content}
    </Modal>
  )
}

ModalBasic.propTypes = {
  content: Proptypes.node,
  width: Proptypes.number,
  title: Proptypes.string,
  onOpen: Proptypes.bool,
  onOk: Proptypes.func,
  onCancel: Proptypes.func,
  cancelText: Proptypes.string,
  okText: Proptypes.string,
  isShowFooter: Proptypes.bool,
}
