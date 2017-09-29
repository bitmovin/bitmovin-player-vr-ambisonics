#!/bin/bash

# first create individual c-channel wav files from 16ch file
cmd="ffmpeg -i 16ch.wav "
for i in {1..15}
do
   ch=$((i-1))
   cmd="${cmd} -map_channel 0.0.${ch}"
   eval "$cmd ${i}ch.wav"
done

# remove empty wav files (of unsupported channel number)
find . -type f -empty -delete

# then encode them to ogg, mp3, aac w/o and w/ mp4 container
for file in *.wav; do
	filename="${file%.*}"
	echo "${file} ${filename}.ogg"
    ffmpeg -i ${file} ${filename}.ogg
    # ffmpeg -i ${file} ${filename}.mp3 # mp3 supports max 2 channels (except mp3 surround extension)
    ffmpeg -i ${file} -strict -2 ${filename}.aac
done

for file in *.wav; do
	filename="${file%.*}"
	# ffmpeg -i ${filename}.wav -c:a copy ${filename}-wav.mp4 #mp4 cannot carry wav
    ffmpeg -i ${filename}.ogg -c:a copy ${filename}-ogg.mp4
    # ffmpeg -i ${filename}.mp3 -c:a copy ${filename}-mp3.mp4
    ffmpeg -i ${filename}.aac -c:a copy -bsf:a aac_adtstoasc ${filename}-aac.mp4
done

# remove empty audio files (of unsupported channel number)
find . -type f -empty -delete
