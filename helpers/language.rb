
def lan_dict(lan,value)
    d = { 
        eng:{
            "Your Cart": "Your Cart",
            "Cart": "Cart",
            "Product": "Product",
            "Price": "Price",
            "Sub Total": "Sub Total",
            "Qty": "Qty",
            "Payment": "Payment",
            "Subtotal": "Subtotal",
            "Shipping": "Shipping",
            "Total": "Total",
            "Choose Payment Method": "Choose Payment Method",
            "Business Credit": "Business Credit",
            "Credit Card": "Credit Card",
            "Checkout": "Checkout",
            "Letter Paper": "Letter Paper",
            "Legal Paper": "Legal Paper",
            "Settings": "Settings",
            "Offline Order": "Offline Order",
            "Get a Corporate Account": "Get a Corporate Account",
            "Sign In": "Sign In",
            "Link Account with Apruve": "Link Account with Apruve",
            "Signed in as": "Signed in as",
            "24_ream": "24 lb ream (250 Sheets). <br> Paper dimensions 8.5 x 14.00 inches",
            "20_ream": "20 lb ream (500 Sheets). <br>Paper dimensions 8.5 x 11.00 inches",
            "Change Banner": "Change Banner",
            "Upload Logo": "Upload Logo",
            "Language Preference": "Language Preference",
            "Save": "Save",
            "Upload": "Upload",
            "Chinese": "Chinese",
            "Chinese(Simplified)": "Chinese(Simplified)",
            "Chinese(Traditional)": "Chinese(Traditional)",
            "Sign in to your account": "Sign in to your account",
            "Email": "Email",
            "Password": "Password",
            "logo successfully updated!": "logo successfully updated!",
            "Sign In Failure: Invalid Email Format!": "Sign In Failure: Invalid Email Format!",
            "Credit card payments not supported": "Credit card payments are not supported in this demo. Please pay with Apruve."
            
        },
        zh_s:{
            "Your Cart": "您的购物车",
            "Cart": "购物车",
            "Product": "购物清单",
            "Price": "单价",
            "Sub Total": "小计(美金)",
            "Qty": "数量",
            "Payment": "结算",
            "Subtotal": "小计",
            "Shipping": "运费",
            "Total": "总计",
            "Choose Payment Method": "请选择付款方式",
            "Business Credit": "商业信用",
            "Credit Card": "信用卡",
            "Checkout": "付款",
            "Letter Paper": "A4复印纸",
            "Legal Paper": "多功能打印纸",
            "Settings": "设置",
            "Offline Order": "线下订单",
            "Get a Corporate Account": "获得企业账号",
            "Sign In": "登陆",
            "Link Account with Apruve": "将账号与Apruve关联",
            "Signed in as": "您已登陆为",
            "24_ream": "24磅，令(250 张纸). <br> 纸张尺寸 8.5 x 14.00 英尺",
            "20_ream": "20磅 令(500 张纸). <br> 纸张尺寸 8.5 x 11.00 英尺",
            "Change Banner": "编辑横幅",
            "Upload Logo": "上传标识",
            "Language Preference": "选择语言",
            "Save": "保存",
            "Upload": "上传",
            "Chinese": "中文",
            "Chinese(Simplified)": "中文(简体)",
            "Chinese(Traditional)": "中文(繁體)",
            "Sign in to your account": "登陆您的账号",
            "Email": "电子邮箱",
            "Password": "密码",
            "logo successfully updated!": "标识上传成功",
            "Sign In Failure: Invalid Email Format!": "登陆错误:邮箱格式不正确!",
            "Credit card payments not supported": "抱歉，演示软件不支持信用卡支付，请用Apruve支付."  
        },
        zh_t:{
            "Your Cart": "您的購物車",
            "Cart": "購物車",
            "Product": "購物清單",
            "Price": "單價",
            "Sub Total": "小計(美金)",
            "Qty": "數量",
            "Payment": "結算",
            "Subtotal": "小計",
            "Shipping": "運費",
            "Total": "總計",
            "Choose Payment Method": "請選擇付款方式",
            "Business Credit": "商業信用",
            "Credit Card": "信用卡",
            "Checkout": "付款",
            "Letter Paper": "A4複印紙",
            "Legal Paper": "多功能打印紙",
            "Settings": "設置",
            "Offline Order": "線下訂單",
            "Get a Corporate Account": "獲得企業賬號",
            "Sign In": "登陸",
            "Link Account with Apruve": "將賬號與Apruve關聯",
            "Signed in as": "您已登陸為",
            "24_ream": "24磅，令(250 張紙). <br> 紙張尺寸 8.5 x 14.00 英尺",
            "20_ream": "20磅 令(500 張紙). <br> 紙張尺寸 8.5 x 11.00 英尺",
            "Change Banner": "編輯橫幅",
            "Upload Logo": "上傳標識",
            "Language Preference": "選擇語言",
            "Save": "保存",
            "Upload": "上傳",
            "Chinese": "中文",
            "Chinese(Simplified)": "中文(简体)",
            "Chinese(Traditional)": "中文(繁體)",
            "Sign in to your account": "登陸您的賬號",
            "Email": "電子郵箱",
            "Password": "密碼",
            "logo successfully updated!": "標識上傳成功",
            "Sign In Failure: Invalid Email Format!": "登陸錯誤:郵箱格式不正確!",
            "Credit card payments not supported": "抱歉，演示軟件不支持信用卡支付，請用Apruve支付."       
        }
    } 
    return d[@@language][value]
end

