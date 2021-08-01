import { ReactNode } from "react";
import {
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
} from "@material-ui/core";

type RobotCardProps = {
  media: {
    src: string;
    title: string;
    alt: string;
  };
  title: string;
  content: ReactNode;
  actions: ReactNode;
};

export default function RobotCard({
  media,
  title,
  content,
  actions,
}: RobotCardProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={media.alt}
          image={media.src}
          title={media.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {content}
        </CardContent>
      </CardActionArea>
      <CardActions>{actions}</CardActions>
    </Card>
  );
}
