"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/layout",{

/***/ "(app-pages-browser)/./src/components/NotificationAnnouncement.tsx":
/*!*****************************************************!*\
  !*** ./src/components/NotificationAnnouncement.tsx ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ NotificationAnnouncement; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_IconBell_IconX_tabler_icons_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=IconBell,IconX!=!@tabler/icons-react */ \"(app-pages-browser)/./node_modules/@tabler/icons-react/dist/esm/icons/IconBell.mjs\");\n/* harmony import */ var _barrel_optimize_names_IconBell_IconX_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=IconBell,IconX!=!@tabler/icons-react */ \"(app-pages-browser)/./node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction NotificationAnnouncement() {\n    _s();\n    const [announcements, setAnnouncements] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [unreadCount, setUnreadCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // API'den duyuruları çekmek yerine örnek duyurular gösterelim\n        setAnnouncements([\n            {\n                id: 1,\n                title: \"Yeni \\xd6zellik\",\n                content: \"WhatsApp doğrulama hizmeti artık kullanımda!\",\n                type: \"notification\",\n                active: true,\n                createdAt: new Date().toISOString()\n            },\n            {\n                id: 2,\n                title: \"Bakım Duyurusu\",\n                content: \"Sistemimiz 15.05.2024 tarihinde bakımda olacaktır.\",\n                type: \"notification\",\n                active: true,\n                createdAt: new Date(Date.now() - 86400000).toISOString() // 1 gün önce\n            }\n        ]);\n        setLoading(false);\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Okunmamış bildirim sayısını hesapla\n        setUnreadCount(announcements.length);\n    }, [\n        announcements\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Panel dışına tıklandığında paneli kapat\n        function handleClickOutside(event) {\n            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {\n                setIsOpen(false);\n            }\n        }\n        document.addEventListener(\"mousedown\", handleClickOutside);\n        return ()=>{\n            document.removeEventListener(\"mousedown\", handleClickOutside);\n        };\n    }, []);\n    const toggleDropdown = ()=>{\n        setIsOpen(!isOpen);\n    };\n    const handleClose = (id)=>{\n        setAnnouncements((prev)=>prev.filter((a)=>a.id !== id));\n    };\n    if (loading) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative\",\n        ref: dropdownRef,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: toggleDropdown,\n                className: \"relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IconBell_IconX_tabler_icons_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        className: \"h-6 w-6\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                        lineNumber: 83,\n                        columnNumber: 9\n                    }, this),\n                    unreadCount > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full\",\n                        children: unreadCount\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                        lineNumber: 85,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                lineNumber: 79,\n                columnNumber: 7\n            }, this),\n            isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                className: \"text-sm font-medium text-gray-900 dark:text-white\",\n                                children: \"Bildirimler\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                lineNumber: 95,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>setIsOpen(false),\n                                className: \"text-gray-400 hover:text-gray-500\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IconBell_IconX_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                    className: \"h-4 w-4\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                    lineNumber: 100,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                lineNumber: 96,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                        lineNumber: 94,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"max-h-96 overflow-y-auto\",\n                        children: announcements.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"p-4 text-center text-gray-500 dark:text-gray-400\",\n                            children: \"Bildirim bulunmuyor\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                            lineNumber: 106,\n                            columnNumber: 15\n                        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"divide-y divide-gray-200 dark:divide-gray-700\",\n                            children: announcements.map((announcement)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"p-3 hover:bg-gray-50 dark:hover:bg-gray-700\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex items-start gap-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"flex-shrink-0\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IconBell_IconX_tabler_icons_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                                    className: \"h-4 w-4 text-primary-600 dark:text-primary-400\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                    lineNumber: 118,\n                                                    columnNumber: 25\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                lineNumber: 117,\n                                                columnNumber: 23\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"flex-1\",\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                                                        className: \"font-medium text-sm text-gray-900 dark:text-white\",\n                                                        children: announcement.title\n                                                    }, void 0, false, {\n                                                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                        lineNumber: 121,\n                                                        columnNumber: 25\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                        className: \"text-sm text-gray-600 dark:text-gray-300\",\n                                                        children: announcement.content\n                                                    }, void 0, false, {\n                                                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                        lineNumber: 124,\n                                                        columnNumber: 25\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                        className: \"mt-1 text-xs text-gray-500 dark:text-gray-400\",\n                                                        children: new Date(announcement.createdAt).toLocaleDateString(\"tr-TR\")\n                                                    }, void 0, false, {\n                                                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                        lineNumber: 127,\n                                                        columnNumber: 25\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                lineNumber: 120,\n                                                columnNumber: 23\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                                onClick: ()=>handleClose(announcement.id),\n                                                className: \"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IconBell_IconX_tabler_icons_react__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                                    className: \"h-4 w-4\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                    lineNumber: 135,\n                                                    columnNumber: 25\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                                lineNumber: 131,\n                                                columnNumber: 23\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                        lineNumber: 116,\n                                        columnNumber: 21\n                                    }, this)\n                                }, announcement.id, false, {\n                                    fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                                    lineNumber: 112,\n                                    columnNumber: 19\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                            lineNumber: 110,\n                            columnNumber: 15\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                        lineNumber: 104,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n                lineNumber: 93,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Tolga\\\\smsonaypanelyazilimi\\\\src\\\\components\\\\NotificationAnnouncement.tsx\",\n        lineNumber: 77,\n        columnNumber: 5\n    }, this);\n}\n_s(NotificationAnnouncement, \"w7gRC+Wf7yC5FLFm59J6gFzB5fI=\");\n_c = NotificationAnnouncement;\nvar _c;\n$RefreshReg$(_c, \"NotificationAnnouncement\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL05vdGlmaWNhdGlvbkFubm91bmNlbWVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFb0Q7QUFDRTtBQVd2QyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxlQUFlQyxpQkFBaUIsR0FBR1AsK0NBQVFBLENBQWlCLEVBQUU7SUFDckUsTUFBTSxDQUFDUSxTQUFTQyxXQUFXLEdBQUdULCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1UsUUFBUUMsVUFBVSxHQUFHWCwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUNZLGFBQWFDLGVBQWUsR0FBR2IsK0NBQVFBLENBQUM7SUFDL0MsTUFBTWMsY0FBY1osNkNBQU1BLENBQWlCO0lBRTNDRCxnREFBU0EsQ0FBQztRQUNSLDhEQUE4RDtRQUM5RE0saUJBQWlCO1lBQ2Y7Z0JBQ0VRLElBQUk7Z0JBQ0pDLE9BQU87Z0JBQ1BDLFNBQVM7Z0JBQ1RDLE1BQU07Z0JBQ05DLFFBQVE7Z0JBQ1JDLFdBQVcsSUFBSUMsT0FBT0MsV0FBVztZQUNuQztZQUNBO2dCQUNFUCxJQUFJO2dCQUNKQyxPQUFPO2dCQUNQQyxTQUFTO2dCQUNUQyxNQUFNO2dCQUNOQyxRQUFRO2dCQUNSQyxXQUFXLElBQUlDLEtBQUtBLEtBQUtFLEdBQUcsS0FBSyxVQUFVRCxXQUFXLEdBQUcsYUFBYTtZQUN4RTtTQUNEO1FBQ0RiLFdBQVc7SUFDYixHQUFHLEVBQUU7SUFFTFIsZ0RBQVNBLENBQUM7UUFDUixzQ0FBc0M7UUFDdENZLGVBQWVQLGNBQWNrQixNQUFNO0lBQ3JDLEdBQUc7UUFBQ2xCO0tBQWM7SUFFbEJMLGdEQUFTQSxDQUFDO1FBQ1IsMENBQTBDO1FBQzFDLFNBQVN3QixtQkFBbUJDLEtBQWlCO1lBQzNDLElBQUlaLFlBQVlhLE9BQU8sSUFBSSxDQUFDYixZQUFZYSxPQUFPLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTUcsTUFBTSxHQUFXO2dCQUM5RWxCLFVBQVU7WUFDWjtRQUNGO1FBRUFtQixTQUFTQyxnQkFBZ0IsQ0FBQyxhQUFhTjtRQUN2QyxPQUFPO1lBQ0xLLFNBQVNFLG1CQUFtQixDQUFDLGFBQWFQO1FBQzVDO0lBQ0YsR0FBRyxFQUFFO0lBRUwsTUFBTVEsaUJBQWlCO1FBQ3JCdEIsVUFBVSxDQUFDRDtJQUNiO0lBRUEsTUFBTXdCLGNBQWMsQ0FBQ25CO1FBQ25CUixpQkFBaUI0QixDQUFBQSxPQUFRQSxLQUFLQyxNQUFNLENBQUNDLENBQUFBLElBQUtBLEVBQUV0QixFQUFFLEtBQUtBO0lBQ3JEO0lBRUEsSUFBSVAsU0FBUztRQUNYLE9BQU87SUFDVDtJQUVBLHFCQUNFLDhEQUFDOEI7UUFBSUMsV0FBVTtRQUFXQyxLQUFLMUI7OzBCQUU3Qiw4REFBQzJCO2dCQUNDQyxTQUFTVDtnQkFDVE0sV0FBVTs7a0NBRVYsOERBQUNwQyxnR0FBUUE7d0JBQUNvQyxXQUFVOzs7Ozs7b0JBQ25CM0IsY0FBYyxtQkFDYiw4REFBQytCO3dCQUFLSixXQUFVO2tDQUNiM0I7Ozs7Ozs7Ozs7OztZQU1ORix3QkFDQyw4REFBQzRCO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ0Q7d0JBQUlDLFdBQVU7OzBDQUNiLDhEQUFDSztnQ0FBR0wsV0FBVTswQ0FBb0Q7Ozs7OzswQ0FDbEUsOERBQUNFO2dDQUNDQyxTQUFTLElBQU0vQixVQUFVO2dDQUN6QjRCLFdBQVU7MENBRVYsNEVBQUNuQyxnR0FBS0E7b0NBQUNtQyxXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OztrQ0FJckIsOERBQUNEO3dCQUFJQyxXQUFVO2tDQUNaakMsY0FBY2tCLE1BQU0sS0FBSyxrQkFDeEIsOERBQUNjOzRCQUFJQyxXQUFVO3NDQUFtRDs7Ozs7aURBSWxFLDhEQUFDRDs0QkFBSUMsV0FBVTtzQ0FDWmpDLGNBQWN1QyxHQUFHLENBQUMsQ0FBQ0MsNkJBQ2xCLDhEQUFDUjtvQ0FFQ0MsV0FBVTs4Q0FFViw0RUFBQ0Q7d0NBQUlDLFdBQVU7OzBEQUNiLDhEQUFDRDtnREFBSUMsV0FBVTswREFDYiw0RUFBQ3BDLGdHQUFRQTtvREFBQ29DLFdBQVU7Ozs7Ozs7Ozs7OzBEQUV0Qiw4REFBQ0Q7Z0RBQUlDLFdBQVU7O2tFQUNiLDhEQUFDUTt3REFBR1IsV0FBVTtrRUFDWE8sYUFBYTlCLEtBQUs7Ozs7OztrRUFFckIsOERBQUNnQzt3REFBRVQsV0FBVTtrRUFDVk8sYUFBYTdCLE9BQU87Ozs7OztrRUFFdkIsOERBQUMrQjt3REFBRVQsV0FBVTtrRUFDVixJQUFJbEIsS0FBS3lCLGFBQWExQixTQUFTLEVBQUU2QixrQkFBa0IsQ0FBQzs7Ozs7Ozs7Ozs7OzBEQUd6RCw4REFBQ1I7Z0RBQ0NDLFNBQVMsSUFBTVIsWUFBWVksYUFBYS9CLEVBQUU7Z0RBQzFDd0IsV0FBVTswREFFViw0RUFBQ25DLGdHQUFLQTtvREFBQ21DLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQXRCaEJPLGFBQWEvQixFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ3hDO0dBcEl3QlY7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvTm90aWZpY2F0aW9uQW5ub3VuY2VtZW50LnRzeD83MTAxIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSWNvbkJlbGwsIEljb25YIH0gZnJvbSAnQHRhYmxlci9pY29ucy1yZWFjdCc7XG5cbmludGVyZmFjZSBBbm5vdW5jZW1lbnQge1xuICBpZDogbnVtYmVyO1xuICB0aXRsZTogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHR5cGU6ICdkYXNoYm9hcmQnIHwgJ25vdGlmaWNhdGlvbic7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5vdGlmaWNhdGlvbkFubm91bmNlbWVudCgpIHtcbiAgY29uc3QgW2Fubm91bmNlbWVudHMsIHNldEFubm91bmNlbWVudHNdID0gdXNlU3RhdGU8QW5ub3VuY2VtZW50W10+KFtdKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1bnJlYWRDb3VudCwgc2V0VW5yZWFkQ291bnRdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IGRyb3Bkb3duUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIEFQSSdkZW4gZHV5dXJ1bGFyxLEgw6dla21layB5ZXJpbmUgw7ZybmVrIGR1eXVydWxhciBnw7ZzdGVyZWxpbVxuICAgIHNldEFubm91bmNlbWVudHMoW1xuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICdZZW5pIMOWemVsbGlrJyxcbiAgICAgICAgY29udGVudDogJ1doYXRzQXBwIGRvxJ9ydWxhbWEgaGl6bWV0aSBhcnTEsWsga3VsbGFuxLFtZGEhJyxcbiAgICAgICAgdHlwZTogJ25vdGlmaWNhdGlvbicsXG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAyLFxuICAgICAgICB0aXRsZTogJ0Jha8SxbSBEdXl1cnVzdScsXG4gICAgICAgIGNvbnRlbnQ6ICdTaXN0ZW1pbWl6IDE1LjA1LjIwMjQgdGFyaWhpbmRlIGJha8SxbWRhIG9sYWNha3TEsXIuJyxcbiAgICAgICAgdHlwZTogJ25vdGlmaWNhdGlvbicsXG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gODY0MDAwMDApLnRvSVNPU3RyaW5nKCkgLy8gMSBnw7xuIMO2bmNlXG4gICAgICB9XG4gICAgXSk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIE9rdW5tYW3EscWfIGJpbGRpcmltIHNhecSxc8SxbsSxIGhlc2FwbGFcbiAgICBzZXRVbnJlYWRDb3VudChhbm5vdW5jZW1lbnRzLmxlbmd0aCk7XG4gIH0sIFthbm5vdW5jZW1lbnRzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBQYW5lbCBkxLHFn8SxbmEgdMSxa2xhbmTEscSfxLFuZGEgcGFuZWxpIGthcGF0XG4gICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2tPdXRzaWRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICBpZiAoZHJvcGRvd25SZWYuY3VycmVudCAmJiAhZHJvcGRvd25SZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCB0b2dnbGVEcm9wZG93biA9ICgpID0+IHtcbiAgICBzZXRJc09wZW4oIWlzT3Blbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoaWQ6IG51bWJlcikgPT4ge1xuICAgIHNldEFubm91bmNlbWVudHMocHJldiA9PiBwcmV2LmZpbHRlcihhID0+IGEuaWQgIT09IGlkKSk7XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiIHJlZj17ZHJvcGRvd25SZWZ9PlxuICAgICAgey8qIEJpbGRpcmltIGlrb251ICovfVxuICAgICAgPGJ1dHRvbiBcbiAgICAgICAgb25DbGljaz17dG9nZ2xlRHJvcGRvd259XG4gICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtMiB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtZ3JheS01MDAgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgID5cbiAgICAgICAgPEljb25CZWxsIGNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPlxuICAgICAgICB7dW5yZWFkQ291bnQgPiAwICYmIChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC0yIHB5LTEgdGV4dC14cyBmb250LWJvbGQgbGVhZGluZy1ub25lIHRleHQtd2hpdGUgdHJhbnNmb3JtIHRyYW5zbGF0ZS14LTEvMiAtdHJhbnNsYXRlLXktMS8yIGJnLXJlZC01MDAgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICB7dW5yZWFkQ291bnR9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApfVxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIHsvKiBCaWxkaXJpbSBwYW5lbGkgKi99XG4gICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIG10LTIgdy04MCBiZy13aGl0ZSBkYXJrOmJnLWdyYXktODAwIHJvdW5kZWQtbWQgc2hhZG93LWxnIHotNTAgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCBkYXJrOmJvcmRlci1ncmF5LTcwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMCBkYXJrOmJvcmRlci1ncmF5LTcwMCBmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+QmlsZGlyaW1sZXI8L2gzPlxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LWdyYXktNTAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEljb25YIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtaC05NiBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgIHthbm5vdW5jZW1lbnRzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMCBkYXJrOnRleHQtZ3JheS00MDBcIj5cbiAgICAgICAgICAgICAgICBCaWxkaXJpbSBidWx1bm11eW9yXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtZ3JheS0yMDAgZGFyazpkaXZpZGUtZ3JheS03MDBcIj5cbiAgICAgICAgICAgICAgICB7YW5ub3VuY2VtZW50cy5tYXAoKGFubm91bmNlbWVudCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e2Fubm91bmNlbWVudC5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIGhvdmVyOmJnLWdyYXktNTAgZGFyazpob3ZlcjpiZy1ncmF5LTcwMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1zaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb25CZWxsIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBkYXJrOnRleHQtcHJpbWFyeS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1zbSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7YW5ub3VuY2VtZW50LnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMCBkYXJrOnRleHQtZ3JheS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Fubm91bmNlbWVudC5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtZ3JheS01MDAgZGFyazp0ZXh0LWdyYXktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtuZXcgRGF0ZShhbm5vdW5jZW1lbnQuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoJ3RyLVRSJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNsb3NlKGFubm91bmNlbWVudC5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtZ3JheS02MDAgZGFyazpob3Zlcjp0ZXh0LWdyYXktMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SWNvblggY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufSAiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJJY29uQmVsbCIsIkljb25YIiwiTm90aWZpY2F0aW9uQW5ub3VuY2VtZW50IiwiYW5ub3VuY2VtZW50cyIsInNldEFubm91bmNlbWVudHMiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImlzT3BlbiIsInNldElzT3BlbiIsInVucmVhZENvdW50Iiwic2V0VW5yZWFkQ291bnQiLCJkcm9wZG93blJlZiIsImlkIiwidGl0bGUiLCJjb250ZW50IiwidHlwZSIsImFjdGl2ZSIsImNyZWF0ZWRBdCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsIm5vdyIsImxlbmd0aCIsImhhbmRsZUNsaWNrT3V0c2lkZSIsImV2ZW50IiwiY3VycmVudCIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRvZ2dsZURyb3Bkb3duIiwiaGFuZGxlQ2xvc2UiLCJwcmV2IiwiZmlsdGVyIiwiYSIsImRpdiIsImNsYXNzTmFtZSIsInJlZiIsImJ1dHRvbiIsIm9uQ2xpY2siLCJzcGFuIiwiaDMiLCJtYXAiLCJhbm5vdW5jZW1lbnQiLCJoNCIsInAiLCJ0b0xvY2FsZURhdGVTdHJpbmciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/NotificationAnnouncement.tsx\n"));

/***/ })

});