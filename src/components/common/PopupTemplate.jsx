import { DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import MotionDialogContent from "./MotionDialogContent";
import CloseDialogIcon from "../icons/CloseDialogIcon";
import SmallTitle from "./SmallTitle";

function PopupTemplate({
  children,
  title = "",
  setShowDialog,
  showDialog,
  classNameWrapper = "",
}) {
  return (
    // @ts-ignore
    <AnimatePresence>
      {showDialog && (
        <DialogOverlay
          onDismiss={() => {
            setShowDialog(false);
          }}
          className="z-50 flex items-center justify-center"
        >
          {/* @ts-ignore */}
          <MotionDialogContent
            aria-label="Popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`z-50 md:min-w-[786px] min-w-[460px] !bg-transparent ${classNameWrapper}`}
            style={{ width: 350 }}
          >
            <motion.div
              className="bg-white rounded-lg text-txtColor"
              initial={{ y: +30 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center justify-between gap-3 bg-[#eeeeee] py-[14px] px-5 rounded-t-lg">
                <SmallTitle className="">{title}</SmallTitle>
                <CloseDialogIcon />
              </div>
              <div className="px-5 pb-[18px] pt-[12px]">{children}</div>
            </motion.div>
          </MotionDialogContent>
        </DialogOverlay>
      )}
    </AnimatePresence>
  );
}

export default PopupTemplate;
