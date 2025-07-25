import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import { Button, Typography } from '@mui/material'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'

function Card( { card }) {

  const dispatch = useDispatch()

  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card._id, data: { ...card } })
  const dndKitCardStyles = {
    //touchaction: 'none dánh cho dạng sensor default là pointer
    touchAction: 'none',
    //tranlate để css không bị strech ra
    transform: CSS.Translate.toString(transform),
    transition
  }

  //cap nhat data cho active card trong redux
  const setActiveCard = () => {
    dispatch(updateCurrentActiveCard(card))
  }
  return (
    <MuiCard
      onClick = {setActiveCard}
      ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rbga(0, 0, 0, 0.2)',
        overflow: 'unset',
        border: '1px solid tranparent',
        '&:hover': { borderColor: (theme) => theme.palette.primary.main }
      }}>
      {card?.cover &&
      <CardMedia
        sx={{ height: 140 }}
        image={card?.cover}
        title={card?.title}
      />
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon/>}>{card.memberIds.length}</Button>}
          {!!card?.comments?.length && <Button size="small" startIcon={<CommentIcon/>}>{card.comments.length}</Button>}
          {!!card?.attachments?.length && <Button size="small" startIcon={<AttachmentIcon/>}>{card.attachments.length}</Button>}
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card