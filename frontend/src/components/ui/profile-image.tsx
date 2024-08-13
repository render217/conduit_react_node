import { useEffect, useState } from "react";
import { validateAndRenderImage } from "../../utils";

const defaultImageUrl = "https://api.realworld.io/images/smiley-cyrus.jpeg";

function ProfileImage({ image }: { image: string }) {
    const [imageSrc, setImageSrc] = useState(defaultImageUrl);

    useEffect(() => {
        async function checkImage() {
            const validImageUrl = await validateAndRenderImage(
                image,
                defaultImageUrl
            );
            setImageSrc(validImageUrl);
        }

        checkImage();
    }, [image]);

    return (
        <img src={imageSrc} alt="Profile" className="object-cover size-full" />
    );
}

export default ProfileImage;
