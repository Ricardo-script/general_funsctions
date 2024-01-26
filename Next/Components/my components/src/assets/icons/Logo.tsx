import * as React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
    return (
        <svg
            width={29}
            height={29}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M22.476 20.762c.73 1.905.492 3.682-.714 5.333-1.207 1.651-2.905 2.476-5.095 2.476-1.048 0-2.04-.27-2.976-.81-.937-.539-1.628-1.253-2.072-2.142-2.635.381-4.817-.294-6.547-2.025-1.73-1.73-2.437-3.943-2.12-6.642a5.548 5.548 0 01-2.19-2.213C.254 13.802 0 12.73 0 11.524c0-1.937.881-3.5 2.644-4.692 1.761-1.19 3.483-1.435 5.166-.737l2.952 1.238a7.49 7.49 0 012.524-2.405 7.315 7.315 0 013.38-1.023V0h2.858v4.286c1.174.349 2.143.896 2.905 1.642.762.746 1.412 1.786 1.952 3.12h4.19v2.857h-3.904a7.652 7.652 0 01-.976 3.38 7.067 7.067 0 01-2.358 2.524l1.143 2.953zm-11.81 1.143c0-.857.072-1.69.216-2.5a13.2 13.2 0 01.642-2.357c-.73.349-1.516.595-2.358.737-.84.143-1.674.183-2.5.12 0 1.238.357 2.214 1.071 2.93.715.713 1.692 1.07 2.93 1.07zm-3.523-7.81c1.016 0 1.913-.127 2.691-.38.777-.255 1.785-.763 3.023-1.524L7.143 9.81c-.92-.381-1.706-.374-2.356.022-.652.398-.977 1.025-.977 1.882 0 .826.27 1.429.809 1.81.54.38 1.381.571 2.524.571zm9.524 10.667c.793 0 1.436-.278 1.927-.834.493-.555.612-1.134.358-1.738l-2.571-6.476a15.317 15.317 0 00-1.404 3.048c-.334 1.016-.5 1.936-.5 2.762 0 1.047.182 1.849.548 2.404.364.556.912.834 1.642.834zm3.142-10.572c.318-.317.572-.738.762-1.262.19-.524.286-1.07.286-1.642 0-1.016-.333-1.873-1-2.572-.666-.698-1.492-1.047-2.476-1.047-.572 0-1.111.095-1.62.285-.507.19-.936.46-1.285.81l3.714 1.714 1.62 3.714z"
                fill="#BFB2FF"
            />
        </svg>
    );
}
