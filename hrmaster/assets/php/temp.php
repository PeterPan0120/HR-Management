<?php

$sql = sprintf("UPDATE alloc_event SET event_id=%s, user_id=%s, account_id=%s, startsAt=%s, endsAt=%s, alloc_date=%s where id=%s",
	$alloc_event->event_id,
	json_encode($alloc_event->user_id),
	$post->currUser->account_id,
	$alloc_event->startsAt,
	$alloc_event->endsAt,
	$alloc_event->alloc_date,
	$alloc_event->id
				
				);

"UPDATE alloc_event SET event_id=".$alloc_event->event_id.", user_id='".json_encode($alloc_event->user_id)."', account_id=".$post->currUser->account_id.", startsAt='".$alloc_event->startsAt."', endsAt='".$alloc_event->endsAt."', alloc_date='". $alloc_event->alloc_date."' where id='".$alloc_event->id."'";