import { Button, ConfigProvider } from "antd";
import filterList from "../../assets/filter-list.svg";

interface ButtonComponentProps {
    text: string;
    width?: number;
    height?: number;
    fontSize?: number;
    fontWeight?: number;
    iconSize?: number;
    primary?: boolean;
    icon?: "no-icon" | "only-icon" | "one-icon" | "two-icon";
    ghost?: boolean;
}

function ButtonComponent({
    text,
    width = 15,
    height = 4,
    fontSize = 14,
    fontWeight = 400,
    iconSize = 20,
    primary = true,
    icon = "no-icon",
    ghost = false,
}: ButtonComponentProps) {
    let buttonClass: string = primary ? "bg-primary" : "bg-secondary";

    if (icon === "only-icon") {
        return (
            <Button
                type="primary"
                className={buttonClass}
                icon={<img src={filterList} alt="icon" />}
            />
        );
    }

    if (ghost) {
        return (
            <Button type="text" className="text-danger" ghost>
                <u>{text}</u>
            </Button>
        );
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        paddingInline: width,
                        paddingBlock: height,
                        contentFontSize: fontSize,
                        fontWeight: fontWeight,
                    },
                },
            }}
        >
            <Button type="primary" className={buttonClass}>
                {(icon === "one-icon" || icon === "two-icon") && (
                    <span>
                        <img
                            src={filterList}
                            alt="icon"
                            width={iconSize}
                            height={iconSize}
                        />
                    </span>
                )}
                {text}
                {icon === "two-icon" && (
                    <span>
                        <img
                            src={filterList}
                            alt="icon"
                            width={iconSize}
                            height={iconSize}
                        />
                    </span>
                )}
            </Button>
        </ConfigProvider>
    );
}

export default ButtonComponent;
